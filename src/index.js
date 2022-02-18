const express=  require('express')
require('./db/mongoose.js')
const userRouter= require('./routers/user.js')
const taskRouter= require('./routers/task.js')
require('dotenv').config({path : '../.env'});
const app= express()
console.log(process.env.PORT);
const port=  3000                  

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+process.env.PORT)
})

