import express from 'express'
import mongoose from "mongoose"
import {UserController, DialogController, MessageController} from './controllers';
import {updateLastSeen, checkAuth} from './middleware'
import {loginValidation} from './validations';
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())
app.use(updateLastSeen)
app.use(checkAuth)


const User = new UserController();
const Dialog = new DialogController();
const Messages = new MessageController();

const URL: any = process.env.DATABASE_URL
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false})
  .then(()=>console.log('Connected'))
  .catch(error =>console.log(error))

app.get('/user/:id', User.show);
app.delete('/user/:id', User.delete);
app.post('/user/registration', User.create); 
app.post('/user/login', loginValidation, User.login); 


app.get('/dialogs', Dialog.index); 
app.delete('/dialogs/:id', Dialog.delete); 
app.post('/dialogs', Dialog.create); 

app.get('/messages', Messages.index); 
app.delete('/messages/:id', Messages.delete); 
app.post('/messages', Messages.create); 


app.listen(process.env.PORT, function(){
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})