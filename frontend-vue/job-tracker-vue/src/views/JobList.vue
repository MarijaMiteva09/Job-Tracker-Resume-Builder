<template>
  <div class="job-list">
    <h1>Job List</h1>
    <div v-if="loading">Loading jobs...</div>
    <div v-else>
      <ul v-if="jobs.length">
        <li v-for="job in jobs" :key="job.id" class="job-item">
          <strong>{{ job.position }}</strong> at {{ job.company_name }} — <em>{{ job.status }}</em>
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
  async created() {
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
}
</script>

<style scoped>
.job-list {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.job-item {
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-left: 4px solid #42b983;
}
</style>
