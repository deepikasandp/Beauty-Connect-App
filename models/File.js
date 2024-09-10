const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    meta_data:{}
});

module.exports = mongoose.model('file', FileSchema);
