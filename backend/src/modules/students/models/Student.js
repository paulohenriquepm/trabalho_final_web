const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    start_date: { type: String, default: Date.now },
    class: { type: Schema.Types.ObjectId, ref: 'Class' }
});

module.exports = mongoose.model('Student', schema);