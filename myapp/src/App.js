import { useState } from 'react';
import './App.css';
import { authentication } from './firebase';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

function App() {

  const defaultCountry = "+84";
  
  const [phoneNumb, setPhoneNumb] = useState(defaultCountry);
  const [expandForm, setExpandForm] = useState(false);
  const [otp, setOTP] = useState('');
  
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
    }, authentication);
  }

  const requestOTP = (e) => {
    e.preventDefault();
    if(phoneNumb.length >= 12) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumb, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
    }
  }

  const verifyOTP = (e) => {
    let OTP = e.target.value;
    setOTP(OTP);
    if (OTP.length === 6){
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(OTP).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user))
        alert("Success login!")
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("Error")
      });
      
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={requestOTP}>
        <h1 className='title'>Login with Phone Number</h1>
        <div className='mb-3'>
          <label htmlFor='phoneNumbInput' className='form-label'>Phone Number</label>
          <input type="tel" className='form-control' id='phoneNumbInput' value={phoneNumb} onChange={(e)=>setPhoneNumb(e.target.value)}/>
          
        </div>
        {expandForm === true?
        <>
        <div className='mb-3'>
        <label htmlFor='OTPInput' className='form-label'>OTP</label>
        <input placeholder='Enter OTP' type='number' className='form-control' id='OTPInput' value={otp} onChange={verifyOTP}/>
        </div>
        </>  
        :
        null
      }
      {expandForm === false?
      <button type='submit' className='btn btn-primary'>Request OTP</button>
      :
      null
    }
    <div id='recaptcha-container'></div>
      </form>
    </div>
  );
}

export default App;
