const mongoose= require('mongoose')
require('dotenv').config({path : '../.env'});
console.log(process.env.MONGODB_URL);
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true
})




