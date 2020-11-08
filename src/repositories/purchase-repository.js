const Sale = require('./../models/sale')

exports.getAll = async ({ buyer }) => {
  return Sale.find({ buyer })
    .populate('ticket')
    .populate('buyer', '_id name cpf cnpj fantasyName type')
}
