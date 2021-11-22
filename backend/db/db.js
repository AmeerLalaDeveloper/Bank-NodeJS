const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Student has {name, age, email}
const userSchema = new Schema({
    name: String,
    cash: Number,
    credit: Number,
    isActive: Boolean
});

const userModel = mongoose.model('Users', userSchema);

module.exports = {
    userModel
}
