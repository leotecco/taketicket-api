const saleRepository = require('./../repositories/sale-repository.js')

exports.post = async (req, res) => {
  try {
    const sale = await saleRepository.post({
      ticket: req.body.ticketId,
      buyer: req.person.id,
      quantity: req.body.quantity || 1
    })

    res
      .status(201)
      .json({ message: 'Ingresso comprado com sucesso!', sale })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao comprar ingresso!', error })
  }
}

exports.check = async (req, res) => {
  try {
    const sale = await saleRepository.check({
      identification: req.body.identification,
    })

    if (sale) {
      res
        .status(201)
        .json({ message: 'Ingresso validado com sucesso!', sale, check: true })

      return
    }

    res
      .status(201)
      .json({ message: 'Ingresso não encontrado!', check: false })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao validar ingresso!', error })
  }
}
