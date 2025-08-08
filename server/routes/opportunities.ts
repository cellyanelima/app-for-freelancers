import express from 'express'
import * as db from '../db/index.ts'
import { validNzCities } from './helpers.ts'

const router = express.Router()

// GET /api/v1/opportunities
router.get('/', async (req, res, next) => {
  try {
    const opportunities = await db.getAllOpportunities()
    res.json({ opportunities })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const opportunities = await db.getOpportunitieById(id)
    if (!opportunities) {
      return res.status(404).json({ error: 'Opportunities not found' })
    }
    res.json(opportunities)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      professionName,
      name,
      suburb,
      city,
      mobile,
      email,
      description,
      hours,
    } = req.body

    if (!validNzCities.includes(city.toLowerCase())) {
      return res.status(400).json({ error: 'Field city is invalid.' })
    }

    const profession = await db.getProfessionByName(professionName)
    //console.log('Profession found:', profession)
    if (!profession) {
      return res.status(400).json({ error: 'Profession not found.' })
    }

    const id = await db.addNewOpportunity({
      professionId: profession.id,
      name,
      suburb,
      city,
      mobile,
      email,
      description,
      hours,
    })

    const url = `/api/v1/opportunities/id/${id}`
    res.setHeader('Opportunity', url)
    res.status(201).json({ opportunity: url })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await db.deleteOpportunity(id)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' })

    const {
      professionName,
      professionId,
      name,
      suburb,
      city,
      mobile,
      email,
      description,
      hours,
    } = req.body

    let resolvedProfessionId = professionId
    if (!resolvedProfessionId && professionName) {
      const profession = await db.getProfessionByName(professionName)
      if (!profession)
        return res.status(400).json({ error: 'Profession not found.' })
      resolvedProfessionId = profession.id
    }

    const updated = await db.updateOpportunity({
      id,
      professionId: Number(resolvedProfessionId),
      name,
      suburb,
      city,
      mobile,
      email,
      description,
      hours,
    })

    if (updated === 0)
      return res.status(404).json({ error: 'Opportunity not found' })
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

export default router
