const mongoose = require('mongoose');

mongoose.connection.on('connecting', function () {
    console.log('--connection connecting event--');
})

mongoose.connection.on('error', function () {
    console.log('--connection error event--');
})

// open is same as connected
mongoose.connection.on('open', function () {
    console.log('--connection open event--');
})

mongoose.connection.on('disconnecting', function () {
    console.log('--connection disconnecting event--');
})

mongoose.connection.once('disconnected', function () {
    console.log('--connection disconnected event--');
})
