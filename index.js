process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV === 'production';
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = new express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a'})
}));
app.use(express.static(path.join(__dirname, 'public')));
// middle-wares e.g. "body-parser"
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if (err) return console.log(err)
    console.log(`App is connected to DB`);
});

require('./models/InfectedArea');
require('./models/Tips_faq');
require('./models/User');
require('./models/Report');
require('./config/passport');
app.use(require('./routes'));

app.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server listening on Port: > ${PORT}`);
});

