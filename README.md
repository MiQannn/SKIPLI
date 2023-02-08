# SKIPLI Coding Challenge
**This is my project folders: backend (Express JS + Twilio API) and myapp (React JS + Firebase SDK)**
- **backend**:
> **server.js**: the script sets up a server that listens on a specified port and provides two endpoints: "/CreateNewAccessCode" and "/ValidateAccessCode".

- **myapp**:
> **App.js**: this is a login page, includes 2 main functions (handleSubmit and handleValidate). "handleSubmit" is used to call *generate random access code, save phoneNumber + accessCode to database* and "handleValidate" is used to *check if user input the same Access Code as text to phoneNumber*.

> **App.css**: styles for App.js.

> **firebase.js**: SDK setup and configuration for Firebase.

![image](https://user-images.githubusercontent.com/90604968/217428410-1469d301-af06-4171-a847-8086124f79d2.png)

## Installation
- Clone the project: https://github.com/MiQannn/SKIPLI.git 
- Direct to folder "backend" and install Express JS + Twilio API:
```
npm install express
npm install Twilio
```
- To run server, use command:
```
npm run dev
```
- Direct to folder "myapp" and install npm packages + Firebase:
```
npm install
npm install firebase
```

- To run the project, use command (__*must run folder backend first!*__):
```
npm start
```

### Result
**Login Page**


![image](https://user-images.githubusercontent.com/90604968/217432070-94ff0073-6e41-47dc-909d-1e705cae561c.png)


