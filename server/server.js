const { readdirSync } = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// CSRF setup
const csrfProtection = csrf({ cookie: true });

// PORT
const port = process.env.PORT || 8000;

// CONNECTING TO DATABASE
mongoose
  .connect(process.env.NEW_DATABASE_CONNECTION_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: false,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log('**db connected**');
  })
  .catch(e => console.log('Db connecting error', e));

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// ROUTES
readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)));

// csrf
app.use(csrfProtection);

// csrf route
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// STARTING THE SERVER
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
