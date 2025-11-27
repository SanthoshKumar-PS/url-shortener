import express from 'express'
import { getRedirection } from '../controllers/redirectionController'

export const shortenerRouter=express.Router()

shortenerRouter.get('/:shorten',getRedirection)