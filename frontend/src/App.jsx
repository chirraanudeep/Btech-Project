import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './assets/Components/Navbar/Navbar'
import {Home} from './assets/Components/Home/Home'
import {Evaluate} from './assets/Components/Evaluate/Evaluate'
import {ContactUs} from './assets/Components/ContactUs/ContactUs'
import {LoginPage} from './assets/Components/LoginPage/LoginPage'
import {SignupPage} from './assets/Components/SignupPage/SignupPage'
import {History} from './assets/Components/History/History'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <div className='content-area'>
          <Navbar />
        
          <Routes>
            
            <Route path="/home" element={<Home />} />
            <Route path="/evaluate" element={<Evaluate />} /> {/* Default route */}
            
            <Route path='/ContactUs' element={<ContactUs />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/signup" element={<SignupPage />} /> 
            <Route path="/history" element={<History />} /> 
          </Routes>
        </div>
        
      </BrowserRouter>
    </>
  )
}

export default App
