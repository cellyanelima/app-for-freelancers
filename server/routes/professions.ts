import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /api/v1/professions
router.get('/', async (req, res, next) => {
  try {
    // TODO: Replace this with all of the Professions in the database
    const professions = await db.getAllProfessions()
    res.json({ professions })
  } catch (e) {
    next(e)
  }
})
export default router
