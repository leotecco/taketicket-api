const Ticket = require('./../models/ticket')


exports.post = async ({ event, ...data }) => {
  const ticket = new Ticket({ ...data, event })

  return ticket.save()
}

exports.getAll = async ({ event }) => {
  const tickets = Ticket.find({ event })

  return tickets
}

exports.getById = async ({ id, event }) => {
  return Ticket.findOne({ _id: id, event })
}

exports.put = async (id, data) => {
  return Ticket.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true }
  )
}
