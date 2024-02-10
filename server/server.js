const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
//const axios = require('axios');
require('dotenv').config();
const PORT = 3000;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// require controllers
const cookieController = require('./controllers/cookieController')
const sessionController = require('./controllers/sessionController')
const userController = require('./controllers/userController')
const statsController = require('./controllers/statsController')

// const mongoURI = process.env.DB_URI
const mongoURI = 'mongodb+srv://asokolov5924:Bballer59@mongod.jqlyc2c.mongodb.net/'

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'fitness_tracker'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));
          
cloudinary.config({ 
  cloud_name: 'do9x1o3zv', 
  api_key: '673986778621281', 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'fitness-tracker',
    format: async (req, file) => 'png',
  },
});

const upload = multer({ storage: storage });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, '../dist')));

app.post('/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => res.status(200).json(res.locals));


// create user
app.post('/signup',
  userController.createUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) =>  res.status(200).json(res.locals.user));

  // check if user has active session when trying to access /main
app.get('/main',
 sessionController.isLoggedIn,
 (req, res) => res.status(200).json({message: 'User is Logged In!'}))

 app.patch('/stats', statsController.updateStats, (req, res) => {
  res.sendStatus(200)
 })

 app.get('/stats', statsController.getUserInfo, (req, res) => {
  res.status(200).json(res.locals.userInfo)
 })

 app.patch('/logs', statsController.updateLogs, (req, res) => {
  res.sendStatus(200)
 })


app.delete('/logout', sessionController.endSession, cookieController.removeSSIDCookie, (req, res) => {
  res.status(200).json('Session has ended');
})

app.post('/gpt', async (req, res, next) => {
  console.log('in the gpt');
  console.log("body message: ", req.body.message);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
       {role: "user", content: req.body.message}
      ],
    });
    console.log('hello')
    // console.log(completion.data.choices[0].message);
    res.locals.message = completion.data.choices[0].message;
    next();
  } catch (err) {
    next(err);
  }
}, (req, res) => {
  res.status(200).json({ message: res.locals.message });
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.json(req.file);
})

app.use((req, res) => res.status(404).send('Error page not found'))

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express global error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  console.error(err);
  return res.status(errObj.status).json(errObj.message);
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})