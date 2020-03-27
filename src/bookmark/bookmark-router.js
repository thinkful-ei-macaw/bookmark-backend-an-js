const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const store = require('../store')
const validUrl = require('valid-url');

const bookmarkRouter = express.Router()
const bodyParser = express.json()

bookmarkRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(store.bookmarks)
  .post(bodyParser, (req, res) => {
    const {title, url, description, rating} = req.body
    const bookmarks = { id: uuid(), title, url, description, rating }

    if(!title) {
      logger.error(`Title is required`)
      return res
      .status(400)
      .send(`Title is required`)
    }

    if(!url) {
      logger.error(`Url is required`)
      return res
      .status(400)
      .send(`Url is required`)
    }

    if(!description) {
      logger.error(`Description is required`)
      return res
      .status(400)
      .send(`Description is required`)
    }

    if(!rating) {
      logger.error(`Rating is required`)
      return res
      .status(400)
      .send(`Rating is required`)
    }

    if(isNaN(rating) || rating < 1 || rating > 5) {
      logger.error(`${rating} needs to be a value between 1 and 5`)
      return res
      .status(400)
      .send(`${rating} needs to be a value between 1 and 5`)
    }

    if(!validUrl(url)) {
      logger.error(`${url} provided is not a valid URL`)
      return res
      .status(400)
      .send(`${url} provided is not a valid URL`)
    }

    store.bookmarks.push()

    logger.info(`Bookmark with Bookmark ID:${id} created`)
    res
    .status(201)
    .location(`http://localhost:8000/bookmarks/${bookmarks.id}`)
    .json(bookmarks)

    })
})

    bookmarkRouter
        .route('/bookmarks/:id')
        .get((req, res) => {
            const { id } = req.params;
        
            const bookmark = bookmarks.findIndex(u => u.id === id);
        
            if(!bookmark) {
                logger.error(`whoa, id ${id} not found!`)
                return res.status(404).send('sorry bud, no luck finding anything')
            }
        })
        .delete((req, res) => {
        const { id } = req.params;
    
        const bookmarkIndex = users.findIndex(u => u.id === id);
    
        if (bookmarkIndex === -1) {
            logger.error(`Eep! No way to delete what is not found! ${id}!`)
            return res.status(404).send('404 bud, nothin good')
        }
    
        store.bookmarks.splice(bookmarkIndex, 1);
        
        logger.info(`id ${id} deleted successfully!`)
        res.status(204).end();
    })

module.exports = bookmarkRouter
