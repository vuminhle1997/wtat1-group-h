require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV === 'production';

const app = new express();

// middle-wares e.g. "body-parser"
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err) {
    if (err) return console.log(err)
    console.log(`App is connected to DB`);
});

require('./models/User');
require('./config/passport');
app.use(require('./routes'));

app.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server listening on Port: > ${PORT}`);
});

