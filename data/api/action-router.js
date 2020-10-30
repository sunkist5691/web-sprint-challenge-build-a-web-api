const express = require('express')

const Action = require('../helpers/actionModel')

const router = express.Router()

router.get('/', (req, res) => {

   Action.get()
      .then(actions => {
         res.status(200).json({
            data: actions
         })
      })
      .catch(error => {
         res.status(500).json({
            error: 'The actions could not be retrieved'
         })
      })
})

router.get('/:id', validateActionId, (req, res) => {

   const { id } = req.params

   Action.get(id)
   .then(actions => {
      res.status(200).json({
         data: actions
      })
   })
   .catch(error => {
      res.status(500).json({
         error: 'The action could not be retrieved'
      })
   })

})

router.delete('/:id', validateActionId, (req, res) => {

   const { id } = req.params

   Action.remove(id)
      .then(data => {
         res.status(201).json({
            message: 'Successfully deleted'
         })
      })
      .catch(error => {
         res.status(500).json({
            error: 'The action could not be removed.'
         })
      })
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
   const { id } = req.params
   const updateAction = req.body

 
      Action.update(id, updateAction)
         .then(updated => {
            res.status(201).json(updated)
         })
         .catch(error => {
            res.status(500).json({
               message: 'Something went wrong!!'
            })
         })
   
})

function validateActionId(req, res, next) {
   // do your magic!
   const { id } = req.params
 
   Action.get(id)
     .then(action => { 
 
       if(action){
         console.log('action is exist: ', action)
         req.action = action
 
         next()
       } else {
         console.log('action is undefined')
         next({ code: 400, message: 'There is no action associate with id: ' + id })
       }
     })
     .catch(error => {
 
       next({ code: 500, message: 'Something crashed and burned' })
     })
}
function validateAction(req, res, next) {
   // do your magic!
   const { notes, description } = req.body
 
   if(!notes || !description){
     res.status(404).json({
       message: 'Please provide correct notes or description format'
     })
   } else {
     next()
   }
   
}
module.exports = router
