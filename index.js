process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const fetch = require('node-fetch');
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
const cors = require('cors');

const app = new express();

// middle-wares e.g. "body-parser"
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a'})
}));
app.use(express.static(path.join(__dirname, 'public')));
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

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// notifies current total covid infected people to all connected clients
io.on('connection', function(socket) {
    console.log(`Client connected... ${socket.id}`);
    fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then(data => {
            const COVIDGLOBAL = data.Global;
            console.log(`Global COVID-19 REPORT`, COVIDGLOBAL);
            io.emit('covid notification', COVIDGLOBAL)
        })
    socket.on('disconnect', () => {
        console.log(`Client disconnected... ${socket.id}`)
    })  
});

// every day on 18:00, check the total count of covid infected people around the world
const hourInterval = (1000 * 60 * 60);
setInterval(() => {
    const todayHour = new Date().getHours(); 
    if (todayHour === 18) {
        fetch('https://api.covid19api.com/summary')
            .then(res => res.json())
            .then(data => {
                console.log();
                const COVIDGLOBAL = data.Global;
                console.log(`Global COVID-19 REPORT`, COVIDGLOBAL);
                io.emit('covid daily report', COVIDGLOBAL);
            });
    }
}, hourInterval);

// starts the web app
server.listen(PORT, () => {
    console.log('Server listening on PORT: > ' + PORT);
});

