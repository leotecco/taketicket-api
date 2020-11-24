const mongoose = require('mongoose');
const authRepository = require('./../../src/repositories/auth-repository')
const dotenvSafe = require('dotenv-safe')

dotenvSafe.config()

describe('AuthRepository', () => {
  let person

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  })

  describe('register', () => {
    test('success', async (done) => {
      const data = await authRepository.register({
        name: 'Teste Teste',
        email: 'teste@teste.com',
        cpf: '12345678901',
        cnpj: '12345678901234',
        fantasyName: 'Teste Teste',
        type: 'C',
        password: '123456'
      })

      person = data.person

      expect(person.name).toBe('Teste Teste')
      expect(person.email).toBe('teste@teste.com')
      expect(person.cpf).toBe('12345678901')
      expect(person.cnpj).toBe('12345678901234')
      expect(person.fantasyName).toBe('Teste Teste')
      expect(person.type).toBe('C')

      done()
    })

    test('failure', async (done) => {
      const data = await authRepository.register({
        name: 'Teste Teste',
        email: 'teste@teste.com',
        cpf: '12345678901',
        cnpj: '12345678901234',
        fantasyName: 'Teste Teste',
        type: 'C',
        password: '123456'
      })

      expect(data).toBe(null)

      done()
    })
  })

  describe('login', () => {
    test('failure email', async (done) => {
      const data = await authRepository.login({ email: 'teste2@teste2.com', password: '123456' })

      expect(data).toBe(null)

      done()
    })

    test('failure password', async (done) => {
      const data = await authRepository.login({ email: person.email, password: '123' })

      expect(data).toBe(null)

      done()
    })

    test('success', async (done) => {
      const data = await authRepository.login({ email: person.email, password: '123456' })

      expect(`${data.person.id}`).toBe(`${person.id}`)
      expect(data.person.name).toBe(person.name)
      expect(data.person.email).toBe(person.email)
      expect(data.person.cpf).toBe(person.cpf)
      expect(data.person.cnpj).toBe(person.cnpj)
      expect(data.person.fantasyName).toBe(person.fantasyName)
      expect(data.person.type).toBe(person.type)
      expect(data.token).toBeTruthy()

      done()
    })
  })

  test('me', async (done) => {
    const data = await authRepository.me(person.id)

    expect(data.name).toBe(person.name)
    expect(data.email).toBe(person.email)
    expect(data.cpf).toBe(person.cpf)
    expect(data.cnpj).toBe(person.cnpj)
    expect(data.fantasyName).toBe(person.fantasyName)
    expect(data.type).toBe(person.type)

    done()
  })
})
