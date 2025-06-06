<template>
  <div class="job-list">
    <h1>Job List</h1>

    <!-- Build Resume Button -->
    <router-link to="/resume-builder">
      <button class="resume-button">📝 Build Resume</button>
    </router-link>

    <div v-if="loading">Loading jobs...</div>
    <div v-else>
      <ul v-if="jobs.length">
        <li v-for="job in jobs" :key="job.id" class="job-item">
          <strong>{{ job.position }}</strong> at {{ job.company_name }} — <em>{{ job.status }}</em>
          <div class="actions">
            <button @click="editJob(job)">Edit</button>
            <button @click="deleteJob(job.id)">Delete</button>
          </div>
        </li>
      </ul>
      <div v-else>No jobs found.</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      jobs: [],
      loading: true,
    }
  },
  created() {
    this.fetchJobs()
  },
  methods: {
    async fetchJobs() {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs')
        this.jobs = res.data
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
        this.jobs = []
      } finally {
        this.loading = false
      }
    },
    editJob(job) {
      this.$router.push({ path: `/edit/${job.id}`, query: { job: JSON.stringify(job) } })
    },
    async deleteJob(id) {
      if (confirm('Are you sure you want to delete this job?')) {
        try {
          await axios.delete(`http://localhost:5000/api/jobs/${id}`)
          this.jobs = this.jobs.filter(job => job.id !== id)
        } catch (error) {
          console.error('Failed to delete job:', error)
        }
      }
    },
  },
}
</script>

<style scoped>
.job-list {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.resume-button {
  background-color: #2ecc71;
  color: white;
  padding: 10px 15px;
  border: none;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
}

.job-item {
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-left: 4px solid #42b983;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

button:first-of-type {
  background-color: #3498db;
  color: white;
}

button:last-of-type {
  background-color: #e74c3c;
  color: white;
}
</style>
