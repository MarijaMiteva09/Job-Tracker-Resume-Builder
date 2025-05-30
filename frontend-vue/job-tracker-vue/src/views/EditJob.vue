<template>
  <div class="edit-job">
    <h1>Edit Job</h1>
    <form @submit.prevent="updateJob">
      <div class="form-group">
        <label for="position">Position</label>
        <input v-model="job.position" id="position" required />
      </div>

      <div class="form-group">
        <label for="company">Company</label>
        <input v-model="job.company_name" id="company" required />
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

      <button type="submit">Update Job</button>
    </form>

    <p v-if="success" class="success">Job updated successfully!</p>
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
        status: 'Applied',
        notes: '',
      },
      success: false,
      error: null,
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}`)
      this.job = res.data
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    async updateJob() {
      this.success = false
      this.error = null
      const id = this.$route.params.id
      try {
        await axios.put(`http://localhost:5000/api/jobs/${id}`, this.job)
        this.success = true
      } catch (err) {
        this.error = err.message
      }
    },
  },
}
</script>

<style scoped>
/* Same styling as AddJob.vue */
</style>
