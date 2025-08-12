import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /api/v1/professions
router.get('/', async (req, res, next) => {
  try {
    const professions = await db.getAllProfessions()
    res.json({ professions })
  } catch (e) {
    next(e)
  }
})
export default router
