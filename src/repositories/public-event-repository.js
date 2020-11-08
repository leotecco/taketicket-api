const Event = require('./../models/event')

exports.getAll = async () => {
  const events = Event
    .find()
    .populate('person')
    .sort('-createdAt')

  return events
}
