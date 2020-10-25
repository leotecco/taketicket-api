const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);
