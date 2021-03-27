const mongoose = require('mongoose')

const config = require('../config/db.json');

const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);