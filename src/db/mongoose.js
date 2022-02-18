const mongoose= require('mongoose')
require('dotenv').config({path : '../.env'});
console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true
})




