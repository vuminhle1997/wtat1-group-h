const server = require('./app');

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV === 'production';

server.listen(PORT, () => {
    console.log(`Server listening on PORT: > ${PORT}`);
});

module.exports = {
    app: server
}