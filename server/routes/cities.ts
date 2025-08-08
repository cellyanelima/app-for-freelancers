import express from 'express'

import { validateCity } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET api/v1/cities
router.get('/:city', async (req, res, next) => {
  try {
    const city = validateCity(req.params.city)
    console.log('Validated city:', city)
    const opportunities = await db.getOpportunitiesByCity(city)
    res.json({ city, opportunities })
  } catch (e) {
    next(e)
  }
})
export default router
