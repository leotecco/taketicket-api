const mongoose = require('mongoose');
const dotenvSafe = require('dotenv-safe')
const Person = require('./../../src/models/person')
const Event = require('./../../src/models/event')
const Ticket = require('./../../src/models/ticket')
const saleRepository = require('./../../src/repositories/sale-repository')

dotenvSafe.config()

describe('SaleRepository', () => {
  let person
  let buyer
  let event
  let ticket
  let sales

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    person = new Person({
      name: 'Teste Teste',
      email: 'teste4@teste.com',
      cpf: '12345678901',
      cnpj: '12345678901234',
      fantasyName: 'Teste Teste',
      type: 'C',
      password: '123456'
    })

    await person.save()

    buyer = new Person({
      name: 'Teste Teste',
      email: 'teste5@teste.com',
      cpf: '12345678901',
      cnpj: '12345678901234',
      fantasyName: 'Teste Teste',
      type: 'C',
      password: '123456'
    })

    await buyer.save()

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

    ticket = new Ticket({
      name: 'Teste',
      value: 10,
      event
    })

    ticket.save()
  })

  test('post', async (done) => {
    sales = await saleRepository.post({
      buyer,
      ticket,
      quantity: 10
    })

    expect(sales).toBeInstanceOf(Array)
    expect(sales.length).toBe(10)

    const sale = sales[0]

    expect(sale.buyer).toBeTruthy()
    expect(sale.ticket).toBeTruthy()
    expect(sale.identification).toBeTruthy()
    expect(sale.qrcode).toBeTruthy()

    done()
  })

  describe('check', () => {
    test('success', async (done) => {
      const sale = sales[0]

      const saleChecked = await saleRepository.check({ identification: sale.identification })

      expect(saleChecked.buyer).toBeTruthy()
      expect(saleChecked.ticket).toBeTruthy()
      expect(saleChecked.identification).toBeTruthy()
      expect(saleChecked.qrcode).toBeTruthy()

      done()
    })

    test('failure', async (done) => {
      const saleChecked = await saleRepository.check({ identification: '123' })

      expect(saleChecked).toBeFalsy()

      done()
    })
  })
})
