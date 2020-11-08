const publicEventRepository = require("./../repositories/public-event-repository");

exports.getAll = async (req, res) => {
  try {
    const events = await publicEventRepository.getAll();

    res.status(201).json({ message: "Eventos listados com sucesso!", events });
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar eventos!", error });
  }
};
