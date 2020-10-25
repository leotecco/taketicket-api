const ticketRepository = require('./../repositories/ticket-repository')

exports.post = async (req, res) => {
  try {
    const ticket = await ticketRepository.post({
      ...req.body,
      event: req.params.idEvent,
    })

    res.status(201).json({ message: 'Ingresso criado com sucesso!', ticket })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar ingresso!', error })
  }
}

exports.getAll = async (req, res) => {
  try {
    const tickets = await ticketRepository.getAll({
      event: req.params.idEvent,
    })

    res
      .status(201)
      .json({ message: 'Ingressos listados com sucesso!', tickets })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar ingressos!', error })
  }
}

exports.getById = async (req, res) => {
  try {
    const ticket = await ticketRepository.getById({
      id: req.params.id,
      event: req.params.idEvent,
    })

    if (ticket) {
      res
        .status(201)
        .json({ message: 'Ingresso encontrado com sucesso!', ticket })
      return
    }

    res.status(404).json({ message: 'Ingresso não encontrado!' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar ingresso!', error })
  }
}

exports.put = async (req, res) => {
  try {
    const ticket = await ticketRepository.put(req.params.id, req.body)

    if (ticket) {
      res
        .status(201)
        .json({ message: 'Ingresso atualizado com sucesso!', ticket })
      return
    }

    res.status(404).json({ message: 'Ingresso não encontrado!' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar ingresso!', error })
  }
}
