const express = require('express')

const Project = require('../helpers/projectModel')
const Action = require('../helpers/actionModel')

const router = express.Router()

// GET all projects or specific project
router.get('/', (req, res) => {

   Project.get()
      .then(projects => {
         res.status(200).json({
            data: projects
         })
      })
      .catch(error => {
         res.status(500).json({
            error: 'The projects could not be retrieved'
         })
      })
})

// GET specific project with all actions
router.get('/:id', (req, res) => {
   const { id } = req.params

   if(!id){
      res.status(404).json({
         message: 'The project with the specificed id does not exist'
      })
   } else {
      Project.get(id)
      .then(projects => {
         res.status(200).json({
            data: projects
         })
      })
      .catch(error => {
         res.status(500).json({
            error: 'The projects could not be retrieved'
         })
      })
   }
})

// POST add project
router.post('/', (req, res) => {
   const { name, description } = req.body
   const newProject = req.body

   if(!name || !description){
      res.status(400).json({
         errorMessage: "Please provide title and contents for the post."
      })
   } else {
      Project.insert(newProject)
         .then(project => {
            res.status(201).json(project)
         })
         .catch(error => {
            res.status(500).json({ 
               error: "There was an error while saving the project to the database" 
            })
         })
   }
})

// POST add actions at specific project
router.post('/:id/actions', (req, res) => {
   const { project_id , description, notes } = req.body
   const newAction = req.body
   console.log(newAction)

   if(!project_id || !description){
      res.status(400).json({
         errorMessage: "Please provide project_id and description for the post."
      })
   } else {
      Action.insert(newAction)
         .then(action => {
            res.status(201).json(action)
         })
         .catch(error => {
            res.status(500).json({ 
               error: "There was an error while saving the action to the database" 
            })
         })
   }
})

router.delete('/:id', (req, res) => {

   const { id } = req.params

   if(!id){
      res.status(404).json({
         message: "The project with the specified ID does not exist."
      })
   } else {
      Project.remove(id)
         .then(data => {
            res.status(201).json({
               message: 'Successfully deleted'
            })
         })
         .catch(error => {
            res.status(500).json({
               error: 'The project could not be removed.'
            })
         })
   }
})

router.put('/:id', (req, res) => {
   const { id } = req.params
   const { name, description } = req.body
   const updateProject = req.body

   if(!id){
      res.status(400).json({
         message: 'The post with the specified id does not exist.'
      })
   } else if(!name || !description){
      res.status(400).json({
         errorMessage: 'Please provide name and description correctly'
      })
   } else {

      Project.update(id, updateProject)
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