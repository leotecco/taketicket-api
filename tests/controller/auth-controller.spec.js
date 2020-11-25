const mongoose = require('mongoose');
const dotenvSafe = require('dotenv-safe')
const authRepository = require('./../../src/repositories/auth-repository')
const authController = require('./../../src/controller/auth-controller')
const interceptor = require('./../utils/interceptor')

dotenvSafe.config()

describe('AuthController', () => {
  let person

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    const data = await authRepository.register({
      name: 'Teste Teste',
      email: 'teste6@teste.com',
      cpf: '12345678901',
      cnpj: '12345678901234',
      fantasyName: 'Teste Teste',
      type: 'C',
      password: '123456'
    })

    person = data.person
  })

  describe('register', () => {
    test('success', async (done) => {
      const req = interceptor.mockRequest()
      const res = interceptor.mockResponse()

      req.body.name = 'Teste Teste'
      req.body.email = 'teste7@teste.com'
      req.body.cpf = '12345678901'
      req.body.cnpj = '12345678901234'
      req.body.fantasyName = 'Teste Teste'
      req.body.type = 'C'
      req.body.password = '123456'

      await authController.register(req, res)

      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0].message).toBe('Cadastrado com sucesso!');

      done()
    })

    test('failure', async (done) => {
      const req = interceptor.mockRequest()
      const res = interceptor.mockResponse()

      req.body.name = 'Teste Teste'
      req.body.email = 'teste7@teste.com'
      req.body.cpf = '12345678901'
      req.body.cnpj = '12345678901234'
      req.body.fantasyName = 'Teste Teste'
      req.body.type = 'C'
      req.body.password = '123456'

      await authController.register(req, res)

      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0].message).toBe('Já cadastrado!');

      done()
    })
  })

  describe('login', () => {
    test('success', async (done) => {
      const req = interceptor.mockRequest()
      const res = interceptor.mockResponse()

      req.body.email = 'teste6@teste.com'
      req.body.password = '123456'

      await authController.login(req, res)

      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0].message).toBe('Login realizado com sucesso!');

      done()
    })

    test('failure', async (done) => {
      const req = interceptor.mockRequest()
      const res = interceptor.mockResponse()

      req.body.email = 'teste6@teste.com'
      req.body.password = '123'

      await authController.login(req, res)

      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json.mock.calls.length).toBe(1);
      expect(res.json.mock.calls[0][0].message).toBe('Email e/ou senha inválidos!');

      done()
    })
  })

  test('me', async (done) => {
    const req = interceptor.mockRequest()
    const res = interceptor.mockResponse()

    req.person = {
      _id: person.id
    }
    req.body.email = 'teste6@teste.com'
    req.body.password = '123456'

    await authController.me(req, res)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json.mock.calls[0][0].message).toBe('Dados consultado com sucesso!');

    done()
  })
})
