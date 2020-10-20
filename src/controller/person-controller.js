const personRepository = require("../repositories/person-repository");

exports.post = async (req, res) => {
  try {
    const person = await personRepository.post(req.body);

    res.status(201).json({ message: "Criado sucesso!", person });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar!", error });
  }
};

exports.get = async (req, res) => {
  try {
    const people = await personRepository.get();

    res.json({
      message: "Listados com sucesso!",
      people,
      count: people.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar!", error });
  }
};
