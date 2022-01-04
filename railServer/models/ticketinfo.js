const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    Jdate: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    Jclass: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    final: {
        type: Number,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    bookingacc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    concessiontype: {
        type: Array,
    },
    concessionvalue: {
        type: Array,
    },
},
{
    timestamps: true
});

var ticketinfo = mongoose.model('ticketinfo', ticketSchema);

module.exports = ticketinfo;