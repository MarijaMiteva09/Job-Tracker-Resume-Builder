const express = require('express');
const router = express.Router();
const db = require('../db');

// ===== RESUME =====

// Create a resume
router.post('/', (req, res) => {
  const { user_id, full_name, email, phone, summary } = req.body;
  const query = `INSERT INTO resumes (user_id, full_name, email, phone, summary) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [user_id, full_name, email, phone, summary], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Resume created', resumeId: result.insertId });
  });
});

// Get resume by ID
router.get('/:id', (req, res) => {
  const resumeId = req.params.id;
  db.query('SELECT * FROM resumes WHERE id = ?', [resumeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Resume not found' });
    res.json(results[0]);
  });
});

// Update resume
router.put('/:id', (req, res) => {
  const resumeId = req.params.id;
  const { full_name, email, phone, summary } = req.body;
  const query = `UPDATE resumes SET full_name = ?, email = ?, phone = ?, summary = ? WHERE id = ?`;
  db.query(query, [full_name, email, phone, summary, resumeId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Resume updated' });
  });
});

// Delete resume
router.delete('/:id', (req, res) => {
  const resumeId = req.params.id;
  db.query('DELETE FROM resumes WHERE id = ?', [resumeId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Resume deleted' });
  });
});


// ===== EDUCATION =====

// Add education to resume
router.post('/:resumeId/education', (req, res) => {
  const { resumeId } = req.params;
  const { school_name, degree, field_of_study, start_date, end_date } = req.body;
  const query = `INSERT INTO education (resume_id, school_name, degree, field_of_study, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [resumeId, school_name, degree, field_of_study, start_date, end_date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Education added', educationId: result.insertId });
  });
});

// Get all education for a resume
router.get('/:resumeId/education', (req, res) => {
  const { resumeId } = req.params;
  db.query('SELECT * FROM education WHERE resume_id = ?', [resumeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update education
router.put('/:resumeId/education/:eduId', (req, res) => {
  const { eduId } = req.params;
  const { school_name, degree, field_of_study, start_date, end_date } = req.body;
  const query = `UPDATE education SET school_name = ?, degree = ?, field_of_study = ?, start_date = ?, end_date = ? WHERE id = ?`;
  db.query(query, [school_name, degree, field_of_study, start_date, end_date, eduId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Education updated' });
  });
});

// Delete education
router.delete('/:resumeId/education/:eduId', (req, res) => {
  const { eduId } = req.params;
  db.query('DELETE FROM education WHERE id = ?', [eduId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Education deleted' });
  });
});


// ===== EXPERIENCE =====

// Add experience to resume
router.post('/:resumeId/experience', (req, res) => {
  const { resumeId } = req.params;
  const { company_name, position, start_date, end_date, description } = req.body;
  const query = `INSERT INTO experience (resume_id, company_name, position, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [resumeId, company_name, position, start_date, end_date, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Experience added', experienceId: result.insertId });
  });
});

// Get all experience for a resume
router.get('/:resumeId/experience', (req, res) => {
  const { resumeId } = req.params;
  db.query('SELECT * FROM experience WHERE resume_id = ?', [resumeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update experience
router.put('/:resumeId/experience/:expId', (req, res) => {
  const { expId } = req.params;
  const { company_name, position, start_date, end_date, description } = req.body;
  const query = `UPDATE experience SET company_name = ?, position = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?`;
  db.query(query, [company_name, position, start_date, end_date, description, expId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Experience updated' });
  });
});

// Delete experience
router.delete('/:resumeId/experience/:expId', (req, res) => {
  const { expId } = req.params;
  db.query('DELETE FROM experience WHERE id = ?', [expId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Experience deleted' });
  });
});


// ===== SKILLS =====

// Add skill to resume
router.post('/:resumeId/skills', (req, res) => {
  const { resumeId } = req.params;
  const { skill_name } = req.body;
  const query = `INSERT INTO skills (resume_id, skill_name) VALUES (?, ?)`;
  db.query(query, [resumeId, skill_name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Skill added', skillId: result.insertId });
  });
});

// Get all skills for a resume
router.get('/:resumeId/skills', (req, res) => {
  const { resumeId } = req.params;
  db.query('SELECT * FROM skills WHERE resume_id = ?', [resumeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update skill
router.put('/:resumeId/skills/:skillId', (req, res) => {
  const { skillId } = req.params;
  const { skill_name } = req.body;
  const query = `UPDATE skills SET skill_name = ? WHERE id = ?`;
  db.query(query, [skill_name, skillId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Skill updated' });
  });
});

// Delete skill
router.delete('/:resumeId/skills/:skillId', (req, res) => {
  const { skillId } = req.params;
  db.query('DELETE FROM skills WHERE id = ?', [skillId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Skill deleted' });
  });
});


// ===== PROJECTS =====

// Add project to resume
router.post('/:resumeId/projects', (req, res) => {
  const { resumeId } = req.params;
  const { project_name, description, technologies, link } = req.body;
  const query = `INSERT INTO projects (resume_id, project_name, description, technologies, link) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [resumeId, project_name, description, technologies, link], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project added', projectId: result.insertId });
  });
});

// Get all projects for a resume
router.get('/:resumeId/projects', (req, res) => {
  const { resumeId } = req.params;
  db.query('SELECT * FROM projects WHERE resume_id = ?', [resumeId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update project
router.put('/:resumeId/projects/:projectId', (req, res) => {
  const { projectId } = req.params;
  const { project_name, description, technologies, link } = req.body;
  const query = `UPDATE projects SET project_name = ?, description = ?, technologies = ?, link = ? WHERE id = ?`;
  db.query(query, [project_name, description, technologies, link, projectId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project updated' });
  });
});

// Delete project
router.delete('/:resumeId/projects/:projectId', (req, res) => {
  const { projectId } = req.params;
  db.query('DELETE FROM projects WHERE id = ?', [projectId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project deleted' });
  });
});


module.exports = router;
