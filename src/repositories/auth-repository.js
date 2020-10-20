const jwt = require("jsonwebtoken")
const Person = require("../app/models/person")

exports.register = async (data) => {
  const hasPerson = await Person.findOne({ email: data.email })

  if (hasPerson) {
    return null
  }

  const person = new Person({
    name: data.name,
    email: data.email,
    cpf: data.cpf,
    cnpj: data.cnpj,
    fantasyName: data.fantasyName,
    type: data.type,
  })

  person.password = person.generateHash(data.password)

  await person.save()

  return {
    person: {
      name: person.name,
      email: person.email,
      cpf: person.cpf,
      cnpj: person.cnpj,
      type: person.type
    },
  }
}

exports.login = async (data) => {
  const person = await Person.findOne({ email: data.email })

  if (!person) {
    return null
  }

  if (!person.validPassword(data.password)) {
    return null
  }

  return {
    person: {
      id: person.id,
      email: person.email,
      cpf: person.cpf,
      cnpj: person.cnpj,
      fantasyName: person.fantasyName,
      type: person.type,
    },
    token: jwt.sign({ id: person.id }, process.env.SECRET, { expiresIn: 86400 }),
  }
}
