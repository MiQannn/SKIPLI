const express = require('express');
const cors = require("cors");
const app = express();
const accountSid = "AC873773f39a0bbc0ed506ec1ec50729cf";
const authToken = "6bee5598206def1056d9e5c1c94717bc";
const client = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(express.json());

const accessCodes = {};

app.post('/CreateNewAccessCode', (req, res) => {
  const { phoneNumber } = req.body;
  const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
  accessCodes[phoneNumber] = accessCode;
  res.send({ accessCode });

  //Twilio
  client.messages
  .create({
     to: phoneNumber,
     from: '+16304746897',
     body: `Your Access Code is ${accessCode}`
   })
  .then(message => console.log(message.sid))
  .done();
});

app.post('/ValidateAccessCode', (req, res) => {
  const { phoneNumber, accessCode } = req.body;
  if (accessCodes[phoneNumber] === accessCode) {
    accessCodes[phoneNumber] = '';
    res.send({ success: true });
  } else {
    res.status(400).send({ success: false });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
