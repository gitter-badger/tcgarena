const router = require('express').Router()
const {Deck} = require('../db/models')
const {requireLogin} = require('../middlewares')

// /api/decks GET
router.get('/', requireLogin, async (req, res, next) => {
  try {
    const decks = await Deck.findAll({
      where: {userId: req.user.id}
    })
    res.json(decks)
  } catch (e) { next(e) }
})

// /api/decks POST
router.post('/', requireLogin, async (req, res, next) => {
  try {
    const {format, decklist, deckName} = req.body
    const deck = await Deck.create({
      format,
      list: decklist,
      name: deckName,
      userId: req.user.id
    })
    res.status(200).json(deck)
  } catch (e) { next(e) }
})

// /api/decks PUT
router.put('/', requireLogin, async (req, res, next) => {
  try {
    const {format, decklist: list, deckName: name, deckId: id} = req.body
    // I really prefer lodash for unused vars that we have to no choice but to assign to something
    const [_, updatedDeck] = await Deck.update(
      {format, list, name},
      {where: {id}, returning: true}
    )
    res.status(200).json(updatedDeck[0])
  } catch (e) { next(e) }
})

// /api/decks/:id DELETE
router.delete('/:id', requireLogin, async (req, res, next) => {
  try {
    const {id} = req.params
    await Deck.destroy({where: {id}})
    res.sendStatus(200)
  } catch(e) { next(e) }
})

module.exports = router
