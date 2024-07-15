// Frontend Development(JavaScript)

const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');

const loadJobs = async () => {
    try {
        const response = await fetch('/jobs');
        const jobs = await response.json();
        // Update the UI with the fetched jobs
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
};

jobForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Handle form submission and sending data to the server
});

loadJobs();

const editJob = async (jobId) => {
    // Fetch the job data
    const response = await fetch(`/jobs/${jobId}`);
    const job = await response.json();

    // Create a form for editing
    const editForm = document.createElement('form');
    editForm.id = `editJobForm-${jobId}`;
    // Add input fields for editing job details
    // ...

    // Replace the table row with the edit form
    const jobRow = document.getElementById(`job-${jobId}`);
    jobRow.innerHTML = '';
    jobRow.appendChild(editForm);
};

const deleteJob = async (jobId) => {
    try {
        await fetch(`/jobs/${jobId}`, { method: 'DELETE' });
        loadJobs(); // Reload the job list
    } catch (error) {
        console.error('Error deleting job:', error);
    }
};