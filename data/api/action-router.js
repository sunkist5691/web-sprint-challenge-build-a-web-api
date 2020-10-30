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

router.get('/:id', (req, res) => {
   const { id } = req.params

   if(!id){
      res.status(404).json({
         message: 'The action with the specificed id does not exist'
      })
   } else {
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
   }
})

router.delete('/:id', (req, res) => {

   const { id } = req.params

   if(!id){
      res.status(404).json({
         message: "The action with the specified ID does not exist."
      })
   } else {
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
   }
})

router.put('/:id', (req, res) => {
   const { id } = req.params
   const { notes, description } = req.body
   const updateAction = req.body

   if(!id){
      res.status(400).json({
         message: 'The action with the specified id does not exist.'
      })
   } else if(!notes || !description){
      res.status(400).json({
         errorMessage: 'Please provide notes and description correctly'
      })
   } else {

      Action.update(id, updateAction)
         .then(updated => {
            res.status(201).json(updated)
         })
         .catch(error => {
            res.status(500).json({
               message: 'Something went wrong!!'
            })
         })
   }
})


module.exports = router
