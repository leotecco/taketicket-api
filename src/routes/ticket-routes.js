const express = require('express');
const router = express.Router({ mergeParams: true });
const ticketController = require('./../controller/ticket-controller');

router.post('/', ticketController.post);

router.get('/', ticketController.getAll);

router.get('/:id', ticketController.getById);

router.put('/:id', ticketController.put);

module.exports = router;
