const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
//const main = require('./views/main');
const { db } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);
app.get('/', (req, res, next) => {
  try {
    res.redirect('/wiki');
  } catch (err) {
    next(err);
  }
});

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

const init = async () => {
  await db.sync();
  app.listen(3000, () => {
    console.log('Listening!!!!');
  });
};

init();
