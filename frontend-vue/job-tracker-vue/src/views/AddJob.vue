<template>
  <div class="add-job">
    <h1>Add New Job</h1>
    <form @submit.prevent="submitJob">
      <div class="form-group">
        <label for="position">Position</label>
        <input v-model="job.position" id="position" required />
      </div>

      <div class="form-group">
        <label for="company">Company</label>
        <input v-model="job.company" id="company" required />
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="job.status" id="status">
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      <div class="form-group">
        <label for="notes">Notes</label>
        <textarea v-model="job.notes" id="notes"></textarea>
      </div>

      <button type="submit">Add Job</button>
    </form>

    <p v-if="success" class="success">Job added successfully!</p>
    <p v-if="error" class="error">Error: {{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      job: {
        position: '',
        company_name: '',
        status: 'pending',
        notes: '',
      },
      success: false,
      error: null,
    }
  },
  methods: {
    async submitJob() {
      this.success = false
      this.error = null
      try {
        const res = await axios.post('http://localhost:5000/api/jobs', this.job)
        this.success = true
        this.job = {
          position: '',
          company: '',
          status: 'pending',
          notes: '',
        }
      } catch (err) {
        console.error('Job add error:', err)
        this.error = err.response?.data?.error || err.message
      }
    },
  },
}
</script>

<style scoped>
.add-job {
  padding: 20px;
  max-width: 500px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.success {
  color: green;
  margin-top: 15px;
}

.error {
  color: red;
  margin-top: 15px;
}
</style>
