require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.APP_PORT || 6002;

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());

const notes = require('./routes/notes.js');

app.use('/notes', notes);

app.use('/', (req, res) => {
  res.send('Welcome To React-Notes Backend, to see all notes go to this path : /notes/getallnotes');
});

app.listen(PORT, () => {
  console.log(`Server Running in PORT ${PORT}`);
});
