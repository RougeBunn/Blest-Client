const express = require('express');
const path = require('path');
const blessingsService = require('./blessings-service');
const { requireAuth } = require('../middleware/jwt-auth');
const assert = require('assert');

const blessingsRouter = express.Router();
const jsonBodyParser = express.json();

blessingsRouter
  .get('/', jsonBodyParser, function(req, res, next) {
    // TODO: get all blessings
  })
  .post('/', jsonBodyParser, (req, res, next) => {
    const requestPayload = req.body;
    // TODO: request validation to make sure we have all params (replace assert)
    assert(requestPayload.blessing, 'Blessing not in request body.');
    assert(requestPayload.userId, 'userId not present in request body.');
    /**
     * (id of user that's logged in)
     * { "blessing": "text of blessing", "userId": 1  }
     */
    blessingsService
      .createBlessing(req.app.get('db'), requestPayload)
      .then(savedBlessing => {
        console.log('saved blessing', savedBlessing);
        res.json({
          blessing: savedBlessing
        });
      });
  })
  .put('/:blessingId', jsonBodyParser, (req, res, next) => {
    // TODO: update existing blessing
    const blessingId = req.params.blessingId;
  })
  .delete('/:blessingId', (req, res, next) => {
    // TODO: update existing blessing
    const blessingId = req.params.blessingId;
    blessingsService
      .deleteBlessing(req.app.get('db'), blessingId)
      .then(numOfRowsAffected => {
        console.log('rows affected: ', numOfRowsAffected);
        res.json({});
      })
      .catch(err => {
        res.json({
          message: err.message
        });
      });
  });

// blessingsRouter
//   .route('/blesspage/:user_id')
//   .post(requireAuth, jsonBodyParser, (req, res, next) => {
//     const { author_id, text } = req.body;
//     const newBlessing = { author_id, text };

//     for (const [key, value] of Object.entries(newBlessing))
//       if (value == null)
//         return res.status(400).json({
//           error: `Missing '${key}' in request body`
//         });

//     newBlessing.user_id = req.user.id;

//     blessingsService
//       .insertBlessing(req.app.get('db'), newBlessing)
//       .then(blessing => {
//         res
//           .status(201)
//           .location(path.posix.join(req.originalUrl, `/${blessing.id}`));
//         //   .json(BlestListService.serializeBlessing(blessing));
//       })
//       .catch(next);
//   });

module.exports = blessingsRouter;
