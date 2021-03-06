import express from "express"
import { UserModel } from '../models'
import { createJWT, generatePasswordHash } from '../utils'
import { IUser } from './../models/User';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

class UserController {
  show(req: express.Request, res: express.Response) {
    const id: string = req.params.id
    UserModel.findById(id, (err: any, user: any) => {
      if (err) {
        return res.status(404).json({
          message: 'User not Found'
        })
      } res.json(user)
    })
  }


  create(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password
    }
    const user = new UserModel(postData)
    user.save().then((obj: any) => {
      res.json(obj)
    }).catch(reason => {
      res.json(reason)
    })
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id
    UserModel.findOneAndRemove({ _id: id })
      .then(user => {
        if (user) {
          res.json({
            message: `User ${user.fullname} deleted`
          })
        }
      })
      .catch(() => {
        res.json({
          message: "User not found"
        })
      })
  }

  login(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      password: req.body.password
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    UserModel.findOne({ email: postData.email }, (err: any, user: any) => {
      if (err) {
        return res.status(404).json({
          message: 'User not Found'
        })
      }

      if (bcrypt.compareSync(postData.password, user.password)) {
        const token = createJWT(user);
        res.json({
          status: 'success',
          token,
        });
      } else {
        res.json({
          status: 'error',
          message: 'Incorrect password or email',
        });
      }
    })
  }
}

export default UserController