const Sale = require('./../models/sale')

exports.getAll = async ({ buyer }) => {
  return Sale.find({ buyer })
    .populate({
      path: 'ticket',
      populate: {
        path: 'event',
        model: 'Event'
      }
    })
    .populate('buyer', '_id name cpf cnpj fantasyName type')
}
