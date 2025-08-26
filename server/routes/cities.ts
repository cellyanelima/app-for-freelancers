import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET api/v1/cities
router.get('/', async (req, res, next) => {
  try {
    const opportunities = await db.getAllOpportunities()
    res.json({ opportunities })
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
