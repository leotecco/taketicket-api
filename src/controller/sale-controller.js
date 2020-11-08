const saleRepository = require('./../repositories/sale-repository.js')

exports.post = async (req, res) => {
  try {
    const data = await saleRepository.post({
      ticket: req.body.ticketId,
      buyer: req.person.id,
      quantity: req.body.quantity || 1
    });

    if (data) {
      res
        .status(201)
        .json({ tickets: data, message: 'Ingresso comprado com sucesso!', person: data.person });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao comprar ingresso!', error });
  }
};
