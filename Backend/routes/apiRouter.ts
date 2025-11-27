import express from 'express'
import { createShortUrl, deleteData, getAllData, getStatsData } from '../controllers/apiController'

export const apiRouter = express.Router()

apiRouter.post('/',createShortUrl)
apiRouter.get('/',getAllData)
apiRouter.get('/:shorten',getStatsData)
apiRouter.delete('/',deleteData)
