const db = require('../mysqlConnection.js');

// Menambahkan Notes
const addNotes = async (req, res) => {
  try {
    const { title, datetime, note } = req.body;

    const insertUserQuery = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
    await db.query(insertUserQuery, [title, datetime, note]);

    res.status(200).json('Successfully Added Notes');
  } catch (error) {
    res.status(500).json({ error: 'Sorry, something went wrong on the server' });
  }
};

// Mendapatkan Semua Notes
const getAllNotes = async (req, res) => {
  try {
    const selectAllNotesQuery = 'SELECT * FROM notes';
    const [rows] = await db.query(selectAllNotesQuery);

    res.status(200).json({ Notes: rows });
  } catch (error) {
    res.status(500).json({ error: 'Sorry, something went wrong on the server' });
  }
};

// Mengambil Satu Notes
const getOneNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const selectOneNoteQuery = 'SELECT * FROM notes WHERE id = ?';
    const [rows] = await db.query(selectOneNoteQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ Note: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Sorry, something went wrong on the server' });
  }
};

// Melakukan Update Notes
const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, datetime, note } = req.body;

    if (!title || !datetime || !note) {
      return res.status(400).json({ error: 'Title, datetime, and note are required' });
    }

    const updateNoteQuery = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
    const [result] = await db.query(updateNoteQuery, [title, datetime, note, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const selectUpdatedNoteQuery = 'SELECT * FROM notes WHERE id = ?';
    const [updatedNoteRows] = await db.query(selectUpdatedNoteQuery, [id]);

    res.status(200).json({ message: 'Note successfully updated', updatedNote: updatedNoteRows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Sorry, something went wrong on the server' });
  }
};

// Melakukan Delete Notes
const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteNoteQuery = 'DELETE FROM notes WHERE id = ?';
    const [result] = await db.query(deleteNoteQuery, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Sorry, something went wrong on the server' });
  }
};

module.exports = { addNotes, getAllNotes, getOneNotes, updateNotes, deleteNotes };
