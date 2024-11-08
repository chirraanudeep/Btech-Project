import './Home.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timeout1 = setTimeout(() => setShowTitle(true), 1000); // Show title after 1s
    const timeout2 = setTimeout(() => setShowParagraph(true), 1000); // Show paragraph after 2s
    const timeout3 = setTimeout(() => setShowButton(true), 1000); // Show button after 3s

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);
  
  return (
    <div className="home-container">
      <div className="home-section">
        <div className="home-left">
          {showTitle && (
            <>
              <h1 className="title home-title animate-title">DEEP</h1>
              <h1 className="title home-title animate-title">FAKE</h1>
              <h1 className="title home-title animate-title">DETECTION</h1>
            </>
          )}
        </div>

        <div className="home-right">
          {showParagraph && (
            <p className="home-paragraph animate-paragraph">
              Welcome to our Deep Fake Detection platform. We utilize advanced AI
              technology to analyze videos and determine the authenticity of the
              content. Our system is designed to provide accurate and reliable
              deep fake detection results, empowering users to make informed
              decisions about the content they encounter.
            </p>
          )}
        </div>
      </div>

      <div className="home-bottom">
        {showButton && (
          <button className="button animate-button" onClick={() => navigate('/evaluate')}>Evaluate</button>
        )}
      </div>
    </div>
  );
}