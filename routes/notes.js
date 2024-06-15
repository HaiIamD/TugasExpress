const express = require('express');
const router = express.Router();
const { addNotes, getAllNotes, getOneNotes, updateNotes, deleteNotes } = require('../controllers/notes.js');

router.post('/addnotes', addNotes);
router.get('/getallnotes', getAllNotes);
router.get('/getonenotes/:id', getOneNotes);
router.patch('/updatenotes/:id', updateNotes);
router.delete('/deletenotes/:id', deleteNotes);

module.exports = router;
