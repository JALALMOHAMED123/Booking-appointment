const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use(express.static('views'));

app.use(userRoutes);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });