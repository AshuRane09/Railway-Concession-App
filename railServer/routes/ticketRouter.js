const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Ticketinfo = require('../models/ticketinfo');

const ticketRouter = express.Router();

ticketRouter.use(bodyParser.json());

ticketRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Ticketinfo.find(req.query)
    .populate('bookingacc')
    .then((ticketinfo) => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(ticketinfo);
    },
    (err) => next(err))
    .catch((err) => next(err));    
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    req.body.bookingacc = req.user._id;
    Ticketinfo.create(req.body)
    .then((ticket) => {
        console.log('Ticket Submitted ', ticket);
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(ticket);
    },
    (err) => next(err))
    .catch((err) => next(err));
})

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /ticketinfo');
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Ticketinfo.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(resp);
    },
    (err) => next(err))
    .catch((err) => next(err));
});

ticketRouter.route('/:ticketId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Ticketinfo.findById(req.params.ticketId)
    .populate('bookingacc')
    .then((ticket) => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(ticket);
    },
    (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /ticketinfo/' +req.params.ticketId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Ticketinfo.findByIdAndUpdate(req.params.ticketId, {
        $set: req.body
    }, { new: true })
    .then((ticket) => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(ticket);
    },
    (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Ticketinfo.findByIdAndRemove(req.params.ticketId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(resp);
    },
    (err) => next(err))
    .catch((err) => next(err));
});

ticketRouter.route('/getticket/:userId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Ticketinfo.find({bookingacc : req.params.userId})
    .populate('bookingacc')
    .then((ticket) => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        res.json(ticket);
    },
    (err) => next(err))
    .catch((err) => next(err));
});

module.exports = ticketRouter;