const QRCode = require('qrcode')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  },
  identification: { type: String, required: true },
  qrcode: { type: String, required: true },
});

saleSchema.pre('validate', async function(next) {
  const identification = uuidv4()
  const qrcode = await QRCode.toDataURL(identification)

  this.identification = identification;
  this.qrcode = qrcode

  next();
});


module.exports = mongoose.model('Sale', saleSchema);
