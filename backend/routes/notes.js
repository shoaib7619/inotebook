const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


//ROUTE 1: Get all notes of logged user using: GET "/api/notes/fetchallnotes" Require login
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})

//ROUTE 2: Add new note using: POST "/api/notes/addnote" Require login
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be aleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //If any error found, return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Save a new Note in database with the logged user id:Login required
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const saveNotes = await note.save()
        res.json(saveNotes);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")

    }
})

//ROUTE 3: Update note using: PUT "/api/notes/updatenote" Require login
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        //create a new node object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find a note to be updated and update it.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        //Check the user 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})

//ROUTE 4: Delete note using: DELETE "/api/notes/deletenote" Require login
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find a note to be delete and delete it.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        //Check the user 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})

module.exports = router