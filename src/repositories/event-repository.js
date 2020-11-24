const Event = require('./../models/event')
const s3 = require('./../services/s3-service')
const path = require('path')
const mime = require('mime-types')

exports.post = async ({ person, image, ...data }) => {
  const event = new Event({ ...data, person: person.id })

  const imageS3 = await new Promise((resolve, reject) => {
    /* istanbul ignore next */
    if (!image) {
      resolve(null)
      return
    }

    /* istanbul ignore next */
    s3.upload({
      Bucket: 'taketicket',
      Body: image.buffer,
      Key: `events/${parseInt(Math.random() * 1000000)}${Date.now()}${path.extname(image.originalname)}`,
      ContentType: mime.lookup(image.originalname),
      ACL: 'public-read',
    }, (error, data) => {
      if (error) {
        reject(error)
        return
      }

      resolve(data)
    })
  })

  event.image = imageS3
    /* istanbul ignore next */
    ? imageS3.Location
    : null

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
