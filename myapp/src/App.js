import React, { useState } from 'react';
import {  ref, child, set, push } from "firebase/database";
import database from "./firebase";
import './App.css';



const App = () => {

  const dbRef = ref(database, 'users');
  const defaultCoutry = "+84";

  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  const list = push(dbRef);
  const [phoneNumber, setPhoneNumber] = useState(defaultCoutry);
  const [accessCode, setAccessCode] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAccessCodeChange = (event) => {
    setAccessCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(phoneNumber.length >= 12) {

    try {
      const response = await fetch('http://localhost:8000/CreateNewAccessCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const { accessCode } = await response.json();

      //Save data to firebase database
      console.log(phoneNumber, accessCode)
      set(child(list, 'users'),{
        phoneNumber: phoneNumber ,
        accessCode: accessCode,
      });

    } catch (error) {
      console.error(error);
    }
  }
  else {
    alert("Please input correct phone number!")
  }

};

  const handleValidate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/ValidateAccessCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, accessCode }),
      });
      const { success } = await response.json();
      if (success) {
        setAccessCode('');
        alert('Login success!');
      } else {
        alert('Wrong Access Code!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <form className="form-container">
      <h1 className='title'>Login with Phone Number</h1>
      <div className="contain">
        <label className='label' htmlFor="phone-number">Phone Number:</label>
        <input
          className='form-control'
          id="phone-number"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <button className='btn' type="submit" onClick={handleSubmit}>
        Generate Access Code
      </button>
      <div className="contain">
        <label className='label' htmlFor="access-code">Access Code:</label>
        <input
          placeholder = 'Input access code here'
          className='form-control'
          id="access-code"
          type="text"
          value={accessCode}
          onChange={handleAccessCodeChange}
        />
      </div>
      <button className='btn' type="submit" onClick={handleValidate}>
        Validate Access Code
      </button>
    </form>
    </div>
  );
};

export default App;

