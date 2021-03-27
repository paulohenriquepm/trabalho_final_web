const app = require('./app.js');

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3333;

app.listen(port, function () {
    console.log('🚀 Server listening on port ' + port);
});
