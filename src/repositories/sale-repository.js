const Sale = require('./../models/sale')

exports.post = async ({ buyer, ticket, quantity }) => {
  let sales = []

  for (let currentTicket = 0; currentTicket < quantity; currentTicket++) {
    const sale = new Sale({
      buyer,
      ticket,
    })

    await sale.save()
    await sale
      .populate('ticket')
      .populate('buyer', '_id name cpf cnpj fantasyName type')
      .execPopulate()

    sales = [...sales, sale]
  }

  return sales
}

exports.check = async ({ identification }) => {
  const sale = await Sale.findOne({ identification })

  if (sale) {
    await sale
      .populate('ticket')
      .populate('buyer', '_id name cpf cnpj fantasyName type')
      .execPopulate()
  }

  return sale
}
