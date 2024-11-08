# model.py (Flask API)
from flask import Flask, request, jsonify
import torch
import torchvision.transforms as transforms
import cv2
import numpy as np
import requests
import os
from transformers import TimesformerModel
import torch.nn as nn

app = Flask(__name__)

# 1. Load Your Model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class DeepFakeTimeSformer(nn.Module):
    def __init__(self):
        super(DeepFakeTimeSformer, self).__init__()
        self.model = TimesformerModel.from_pretrained('facebook/timesformer-base-finetuned-k400')
        self.classifier = nn.Linear(self.model.config.hidden_size, 2)

    def forward(self, pixel_values):
        outputs = self.model(pixel_values=pixel_values)
        logits = outputs.last_hidden_state.mean(dim=1)
        return self.classifier(logits)

try:
    model = DeepFakeTimeSformer().to(device)
    model.load_state_dict(torch.load("C:/Users/chirr/Downloads/deepfake_model.pth", map_location=device)) #Correct path
    model.to(device)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    exit()


# 2. Preprocessing Function (Adapt as needed)
def preprocess_video(video_url):
    try:
        response = requests.get(video_url, stream=True)
        response.raise_for_status()

        video = []
        vidcap = cv2.VideoCapture(video_url)

        while True:
            success, image = vidcap.read()
            if not success:
                break
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            transform = transforms.Compose([
                transforms.ToTensor(),
                transforms.Resize((224, 224)), 
                transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
            ])
            frame_tensor = transform(image)
            video.append(frame_tensor.unsqueeze(0))

        if not video:
            raise ValueError("No frames extracted from video")

        video_tensor = torch.cat(video, dim=0).unsqueeze(0).to(device)
        return video_tensor

    except requests.exceptions.RequestException as e:
        print(f"Error downloading video: {e}")
        return None
    except Exception as e:
        print(f"Preprocessing error: {e}")
        return None


# 3. Prediction Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        video_url = request.json.get('videoUrl')
        if not video_url:
            return jsonify({'error': 'Video URL is required'}), 400

        preprocessed_video = preprocess_video(video_url)
        if preprocessed_video is None:
            return jsonify({'error': 'Could not download or preprocess video.'}), 500

        with torch.no_grad():
            model.eval()
            try:
                outputs = model(preprocessed_video)
            except RuntimeError as e:
                if "Expected all tensors to be on the same device" in str(e):
                    print("CUDA error:", e)
                    return jsonify({"error": "CUDA issue (check server logs)"}), 500
                else:
                    raise e


            probabilities = torch.softmax(outputs, dim=1)
            fake_probability = probabilities[0][1].item()  # Get fake probability


            result = {'fake_probability': fake_probability}

        return jsonify(result), 200

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500  # Return a more informative error message


if __name__ == '__main__':
    app.run(debug=True, port=5001)