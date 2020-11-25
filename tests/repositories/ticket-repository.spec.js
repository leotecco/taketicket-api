const mongoose = require('mongoose');
const dotenvSafe = require('dotenv-safe')
const Person = require('./../../src/models/person')
const Event = require('./../../src/models/event')
const ticketRepository = require('./../../src/repositories/ticket-repository')

dotenvSafe.config()

describe('TicketRepository', () => {
  let person
  let event
  let ticket

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    person = new Person({
      name: 'Teste Teste',
      email: 'teste3@teste.com',
      cpf: '12345678901',
      cnpj: '12345678901234',
      fantasyName: 'Teste Teste',
      type: 'C',
      password: '123456'
    })

    await person.save()

    event = new Event({
      name: 'Teste',
      initialDate: '2020-12-20',
      state: 'SP',
      city: 'Marília',
      street: 'Av. João Ramalho',
      number: '1000',
      image: 'teste.png',
      person
    })

    await event.save()
  })

  test('post', async (done) => {
    ticket = await ticketRepository.post({
      name: 'Teste',
      value: 10,
      event
    })

    expect(ticket.name).toBe('Teste')
    expect(ticket.value).toBe(10)

    done()
  })

  test('getAll', async (done) => {
    const tickets = await ticketRepository.getAll({ event })

    expect(tickets).toBeInstanceOf(Array)
    expect(tickets.length).toBe(1)

    done()
  })

  test('getById', async (done) => {
    const ticketSearched = await ticketRepository.getById({ id: ticket._id, event })

    expect(ticketSearched).toBeTruthy()
    expect(ticketSearched.name).toBe(ticket.name)
    expect(ticketSearched.value).toBe(ticket.value)

    done()
  })

  test('put', async (done) => {
    await ticketRepository.put(ticket._id, { name: 'Teste2', value: 20 })

    const ticketSearched = await ticketRepository.getById({ id: ticket._id, event })

    expect(ticketSearched).toBeTruthy()
    expect(ticketSearched.name).toBe('Teste2')
    expect(ticketSearched.value).toBe(20)

    done()
  })
})
