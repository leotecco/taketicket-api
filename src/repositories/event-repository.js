const Event = require("./../models/event");

exports.post = async ({ person, ...data }) => {
  const event = new Event({ ...data, person: person.id });

  return event.save();
};

exports.getAll = async ({ person }) => {
  const events = Event.find({ person: person.id }).populate('person');

  return events;
};

exports.getById = async ({ id, person }) => {
  return Event.findOne({ _id: id, person: person.id });
};

exports.put = async (id, data) => {
  return Event.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true }
  );
};

exports.delete = async (id) => {
  return Event.findByIdAndRemove(id);
};
