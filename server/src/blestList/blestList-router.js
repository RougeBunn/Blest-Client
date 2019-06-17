const express = require('express');
const path = require('path');
const BlestListService = require('./comments-service');
const { requireAuth } = require('../middleware/jwt-auth');

const blestListRouter = express.Router();
const jsonBodyParser = express.json();

blestListRouter
  .route('/blesspage/:userId')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { author_id, text } = req.body;
    const newBlessing = { author_id, text };

    for (const [key, value] of Object.entries(newBlessing))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newBlessing.user_id = req.user.id;

    BlestListService.insertBlessing(req.app.get('db'), newBlessing)
      .then(blessing => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${blessing.id}`));
        //   .json(BlestListService.serializeBlessing(blessing));
      })
      .catch(next);
  });

module.exports = blestListRouter;
