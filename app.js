const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://theninjacoder:A5610818@cluster0.daquq.mongodb.net/theninjaAuth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000);
    console.log('Connection has been made');
  })
  .catch((err) => console.log(err));

app.get('/getcookie', (req, res) => {
  res.cookie('ninjacoder', true, {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000
  });
  res.send('Cookie has been created');
});


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);