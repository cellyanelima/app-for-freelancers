import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /api/v1/opportunities
router.get('/', async (req, res, next) => {
  try {
    // TODO: Replace this with all of the Opportunities in the database
    const opportunities = await db.getAllOpportunities()
    res.json({ opportunities })
  } catch (e) {
    next(e)
  }
})
export default router
