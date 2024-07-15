// Backend Development(Node.js and Express)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const pug = require('pug');

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


// MongoDB connection (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/jobTracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Job Schema
const jobSchema = new mongoose.Schema({
    company: String,
    position: String,
    status: String, // applied, in-progress, rejected, offered
    dateApplied: Date,
    notes: String
});
const Job = mongoose.model('Job', jobSchema);

// Routes
app.get('/', async (req, res) => {
    const jobs = await Job.find();
    res.render('index', { jobs });
});

app.post('/jobs', async (req, res) => {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
});

app.put('/jobs/:id', async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
});

app.delete('/jobs/:id', async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

