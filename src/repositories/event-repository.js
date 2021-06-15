const Event = require('./../models/event')

exports.post = async ({ person, initialDate, ...data }) => {
  const event = new Event({ ...data, initialDate: new Date(initialDate), person: person.id })

  return event.save()
}

exports.getAll = async ({ person }) => {
  const events = Event.find({ person: person.id }).populate('person')

  return events
}

exports.getById = async ({ id, person }) => {
  return Event.findOne({ _id: id, person: person.id })
}

/* istanbul ignore next */
exports.put = async (id, data) => {
  return Event.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true }
  )
}

/* istanbul ignore next */
exports.delete = async (id) => {
  return Event.findByIdAndRemove(id)
}
