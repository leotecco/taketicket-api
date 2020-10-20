const Person = require("../app/models/person")

exports.post = async (data) => {
    const person = new Person(data)
    return person.save()
}

exports.get = () => {
    return Person.find()
}
