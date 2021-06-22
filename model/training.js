const mongoose = require('mongoose');

const TrainingSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },

    phone: {
        type: String,
        maxlenth: [10, 'Incorrect']
    },
    reg_no: String,
    gender: String

});

module.exports = Training = mongoose.model('training', TrainingSchema);