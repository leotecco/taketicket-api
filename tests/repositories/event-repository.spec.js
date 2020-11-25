const mongoose = require('mongoose');
const dotenvSafe = require('dotenv-safe')
const authRepository = require('./../../src/repositories/auth-repository')
const eventRepository = require('./../../src/repositories/event-repository')

dotenvSafe.config()

describe('EventRepository', () => {
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
      email: 'teste2@teste.com',
      cpf: '12345678901',
      cnpj: '12345678901234',
      fantasyName: 'Teste Teste',
      type: 'C',
      password: '123456'
    })

    person = data.person
  })

  describe('post', () => {
    test('without image', async (done) => {
      await expect(eventRepository.post({
        name: 'Teste',
        initialDate: '2020-12-20',
        state: 'SP',
        city: 'Marília',
        street: 'Av. João Ramalho',
        number: '1000',
        person
      })
      ).rejects.toThrow()

      done()
    })
  })

  test('getAll', async (done) => {
    const events = await eventRepository.getAll({ person })

    expect(events).toBeInstanceOf(Array)

    done()
  })

  test('getById', async (done) => {
    const event = await eventRepository.getById({ id: `${person.id}`, person })

    expect(event).toBeFalsy()

    done()
  })
})
