const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  initialDate: { type: Date, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  },
});

module.exports = mongoose.model('Event', eventSchema);
