const express = require('express')
const Answer = require('../models/Answer.js')
const router = express.Router()
router.post('/',async(req,res)=>{
    try {
        const answer = await Answer.create(req.body)
        return res.json(answer)
    } catch (err) {
        console.log(err);
        res.json({message:err.message})
}
})
module.exports = router