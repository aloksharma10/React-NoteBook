const express = require('express')
const Router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note')

Router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })

        console.log(req.user.id)
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

Router.post('/addnotes', fetchuser, [
    body('title', "Please enter a valid title").isLength({ min: 2 }),
    body('description', "description must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req.body.title)
        let noteData = new Note({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        const note = await noteData.save()
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

Router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Invalid request") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Access Denied") }
        console.log(note.user, req.user.id)

        let newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        // {new:true} is used becoz instant reflect our changes, every object have toString method
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

Router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        console.log(note)
        if (!note) { return res.status(404).send("Invalid request") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Access Denied") }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json("note")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})
module.exports = Router