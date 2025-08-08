import * as Path from 'node:path'
import express from 'express'
import professionsRoutes from './routes/professions.ts'
import freelancersRoutes from './routes/freelancers.ts'
import opportunitiesRoutes from './routes/opportunities.ts'
import citiesRoutes from './routes/cities.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/professions', professionsRoutes)
server.use('/api/v1/freelancers', freelancersRoutes)
server.use('/api/v1/opportunities', opportunitiesRoutes)
server.use('/api/v1/cities', citiesRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
