import express from "express"
import {UserModel} from '../models'

export default (
  _: express.Request,
  __: express.Response,
  next: express.NextFunction) => {
  UserModel.findOneAndUpdate(
    {
      _id: "6027b35275941c1814519864"
    },
    {
      fullname: 'QWERTY',
      last_seen: new Date()
    },
      {new: true},
()=>{}
  )
  next()
}