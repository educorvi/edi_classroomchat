/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

console.log(mongoose)

mongoose.connect("mongodb://astra2441.server4you.de:27017?replicaSet=rs0", {useNewUrlParser: true});

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: {
        type: String,
        required: [true, "Nachrichtentext benötigt"]
    },
    user: {
        type: Number,
        required: [true, "Sendender Benutzer benötigt"]
    },

})

const message = mongoose.model('Message', messageSchema);

module.exports = message
