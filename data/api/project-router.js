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
router.get('/:id', validateProjectId, (req, res) => {

   res.status(200).json({ projects: req.project })
   
})

// POST add project
router.post('/', validateProject, (req, res) => {

   const newProject = req.body

   Project.insert(newProject)
      .then(project => {
         res.status(201).json(project)
      })
      .catch(error => {
         res.status(500).json({ 
            error: "There was an error while saving the project to the database" 
         })
      })
})

// POST add actions at specific project
router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {

   const newAction = req.body
 
   Action.insert(newAction)
      .then(action => {
         res.status(201).json(action)
      })
      .catch(error => {
         res.status(500).json({ 
            error: "There was an error while saving the action to the database" 
         })
      })
})

router.delete('/:id', validateProjectId, (req, res) => {

   const { id } = req.params

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
})

router.put('/:id', validateProjectId, validateProjectId, (req, res) => {
   const { id } = req.params
   const updateProject = req.body


   Project.update(id, updateProject)
      .then(updated => {
         res.status(201).json(updated)
      })
      .catch(error => {
         res.status(500).json({
            message: 'Something went wrong!!'
         })
      })

})

function validateProjectId(req, res, next) {
   // do your magic!
   const { id } = req.params
 
   Project.get(id)
     .then(project => { 
 
       if(project){
         console.log('project is exist: ', project)
         req.project = project
 
         next()
       } else {
         console.log('project is undefined')
         res.status(404).json({
            message: 'The id associate with project does not exist.'
         })
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
function validateProject(req, res, next) {
   // do your magic!
   const { name, description } = req.body
 
   if(!name || !description){
     res.status(404).json({
       message: 'Please provide correct name or description format'
     })
   } else {
     next()
   }
   
}
module.exports = router