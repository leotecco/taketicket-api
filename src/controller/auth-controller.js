const authRepository = require('./../repositories/auth-repository');


exports.register = async (req, res) => {
  try {
    const data = await authRepository.register(req.body);

    if (data) {
      res
        .status(201)
        .json({ message: 'Cadastrado com sucesso!', person: data.person });
    }

    res.status(400).json({ message: 'Já cadastrado!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar!', error });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authRepository.login(req.body);

    if (data) {
      return res
        .status(201)
        .json({
          message: 'Login realizado com sucesso!',
          person: data.person,
          token: data.token,
        });
    }

    return res.status(401).json({ message: 'Email e/ou senha inválidos!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login!', error });
  }
};

exports.me = async (req, res) => {
  try {
    const person = await authRepository.me(req.person._id);

    res
      .status(201)
      .json({
        message: 'Dados consultado com sucesso!',
        person,
      });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar dados!', error });
  }
}
