const express=  require('express')
require('./db/mongoose.js')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const userRouter= require('./routers/user.js')
const taskRouter= require('./routers/task.js')
const app= express()
console.log(process.env.PORT)
const port=  process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter) 


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

