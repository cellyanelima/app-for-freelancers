import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET api/v1/cities  -> { cities: { name: string }[] }  (or { id, name } )
router.get('/', async (_req, res, next) => {
  try {
    const cities = await db.getAllCities()
    res.json({ cities }) // [{ id, name }]
  } catch (e) {
    next(e)
  }
})

router.get('/:city', async (req, res, next) => {
  try {
    const city = req.params.city
    const opportunities = await db.getOpportunitiesByCity(city)
    //console.log('Validated city:', city)
    res.json({ city, opportunities })
  } catch (e) {
    next(e)
  }
})
export default router
