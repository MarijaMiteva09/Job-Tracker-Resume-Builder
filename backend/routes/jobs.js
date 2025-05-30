const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE job
router.post('/', (req, res) => {
  const { company_name, position, status, notes } = req.body;
  const query = `INSERT INTO jobs (company_name, position, status, application_date, notes) VALUES (?, ?, ?, CURDATE(), ?)`;
  db.query(query, [company_name, position, status, notes], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Job created', jobId: result.insertId });
  });
});


// READ all jobs
router.get('/', (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// UPDATE a job
router.put('/:id', (req, res) => {
  const { company_name, position, status, application_date, notes } = req.body;
  const query = `UPDATE jobs SET company_name = ?, position = ?, status = ?, application_date = ?, notes = ? WHERE id = ?`;
  db.query(query, [company_name, position, status, application_date, notes, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Job updated' });
  });
});

// DELETE a job
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM jobs WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Job deleted' });
  });
});


// GET job by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM jobs WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'Job not found' })
    res.json(results[0])
  })
})


module.exports = router;
