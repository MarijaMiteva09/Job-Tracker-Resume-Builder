<template>
  <div class="resume-builder">
    <h1>Create Your Resume</h1>
    <form @submit.prevent="submitResume">
      <h2>Basic Info</h2>
      <input v-model="resume.full_name" placeholder="Full Name" required />
      <input v-model="resume.email" placeholder="Email" type="email" />
      <input v-model="resume.phone" placeholder="Phone" />
      <textarea v-model="resume.summary" placeholder="Professional Summary"></textarea>

      <h2>Education</h2>
      <div v-for="(edu, index) in education" :key="index">
        <input v-model="edu.school_name" placeholder="School Name" required />
        <input v-model="edu.degree" placeholder="Degree" />
        <input v-model="edu.field_of_study" placeholder="Field of Study" />
        <input type="date" v-model="edu.start_date" />
        <input type="date" v-model="edu.end_date" />
        <button @click.prevent="removeEducation(index)">Remove</button>
      </div>
      <button @click.prevent="addEducation">Add Education</button>

      <h2>Experience</h2>
      <div v-for="(exp, index) in experience" :key="index">
        <input v-model="exp.company_name" placeholder="Company Name" />
        <input v-model="exp.position" placeholder="Position" />
        <input type="date" v-model="exp.start_date" />
        <input type="date" v-model="exp.end_date" />
        <textarea v-model="exp.description" placeholder="Description"></textarea>
        <button @click.prevent="removeExperience(index)">Remove</button>
      </div>
      <button @click.prevent="addExperience">Add Experience</button>

      <h2>Skills</h2>
      <div v-for="(skill, index) in skills" :key="index">
        <input v-model="skill.skill_name" placeholder="Skill" />
        <button @click.prevent="removeSkill(index)">Remove</button>
      </div>
      <button @click.prevent="addSkill">Add Skill</button>

      <h2>Projects</h2>
      <div v-for="(proj, index) in projects" :key="index">
        <input v-model="proj.project_name" placeholder="Project Name" />
        <textarea v-model="proj.description" placeholder="Description"></textarea>
        <input v-model="proj.technologies" placeholder="Technologies" />
        <input type="date" v-model="proj.start_date" />
        <input type="date" v-model="proj.end_date" />
        <button @click.prevent="removeProject(index)">Remove</button>
      </div>
      <button @click.prevent="addProject">Add Project</button>

      <button type="submit">Save Resume</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      resume: {
        full_name: '',
        email: '',
        phone: '',
        summary: '',
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
    }
  },
  methods: {
    addEducation() {
      this.education.push({ school_name: '', degree: '', field_of_study: '', start_date: '', end_date: '' })
    },
    removeEducation(index) {
      this.education.splice(index, 1)
    },
    addExperience() {
      this.experience.push({ company_name: '', position: '', start_date: '', end_date: '', description: '' })
    },
    removeExperience(index) {
      this.experience.splice(index, 1)
    },
    addSkill() {
      this.skills.push({ skill_name: '' })
    },
    removeSkill(index) {
      this.skills.splice(index, 1)
    },
    addProject() {
      this.projects.push({ project_name: '', description: '', technologies: '', start_date: '', end_date: '' })
    },
    removeProject(index) {
      this.projects.splice(index, 1)
    },
    async submitResume() {
      try {
        const response = await axios.post('http://localhost:5000/api/resumes', {
          ...this.resume,
          education: this.education,
          experience: this.experience,
          skills: this.skills,
          projects: this.projects,
        })
        alert('Resume saved! ID: ' + response.data.resumeId)
      } catch (error) {
        console.error('Error saving resume:', error)
        alert('Failed to save resume.')
      }
    },
  },
}
</script>

<style scoped>
.resume-builder {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}
input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
button {
  margin-bottom: 10px;
}
</style>
