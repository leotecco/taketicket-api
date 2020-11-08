const Event = require('./../models/event')

exports.getAll = async () => {
  const events = Event
    .find()
    .populate('person', '_id name email cpf cnpj fantasyName type')
    .sort('-createdAt')

  return events
}
