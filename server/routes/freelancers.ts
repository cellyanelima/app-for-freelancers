import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /api/v1/freelancers
router.get('/', async (req, res, next) => {
  try {
    // TODO: Replace this with all of the freelancers in the database
    const freelancers = await db.getAllFreelancers()
    res.json({ freelancers })
  } catch (e) {
    next(e)
  }
})
export default router
