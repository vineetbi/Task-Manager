const express=  require('express')
const Task= require('../models/task.js')
const auth= require('../middleware/auth.js')
const router= new express.Router()

router.post('/tasks', auth, async(req,res)=>{
    const task= new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async(req,res)=>{
    var complete= undefined
    const sort= {}

    if(req.query.completed){
        complete = req.query.completed === 'true'
    }
    
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]=== 'desc' ?  -1 : 1
    }

    try{
        var tasks= undefined
        if(complete !== undefined){
            tasks= await Task.find({completed: complete, owner: req.user._id}).limit(req.query.limit-'0').skip(req.query.skip-'0').sort(sort)
        }
        else{
            tasks= await Task.find({owner: req.user._id}).limit(req.query.limit-'0').skip(req.query.skip-'0').sort(sort)
        } 
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async(req,res)=>{

    const _id= req.params.id
    try{
        const task= await Task.findOne({ _id, owner: req.user._id})
        
        if(!task) return res.status(404).send()
        
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async(req,res)=>{
    
    const updates = Object.keys(req.body)
    const allowedUpdates=['description','completed']
    const isValidOperation=updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Updates!"})
    }
    
    try{
        const task= await Task.findOne({ _id: req.params.id, owner: req.user._id})
        
        if(!task) return res.status(404).send()

        updates.forEach((update)=>{
            task[update]= req.body[update]
        })

        await task.save()

        res.send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', auth, async(req,res)=>{
    try{
        const task= await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task) return res.status(404).send()

        res.send(task)
    }catch(error){
        res.status(500).send()
    }
})


module.exports= router