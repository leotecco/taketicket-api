const purchaseRepository = require('./../repositories/purchase-repository')

exports.getAll = async (req, res) => {
  try {
    const purchases = await purchaseRepository.getAll({ buyer: req.person._id })

    res
      .status(200)
      .json({ message: 'Compras listadas com sucesso!', purchases })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao comprar ingresso!', error })
  }
}
