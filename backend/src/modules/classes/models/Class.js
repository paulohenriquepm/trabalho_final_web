const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    course: { type: String, required: true },
    start_date: { type: String, default: Date.now },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model('Class', schema);