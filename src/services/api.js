import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
})

function getAuthHeader() {
  const stored = localStorage.getItem('aklaptop_auth')
  if (!stored) return null
  const { token } = JSON.parse(stored)
  return token ? { Authorization: `Bearer ${token}` } : null
}

// Auth
export function loginUser(credentials) {
  return api.post('/auth/login', credentials).then(r => r.data)
}

// Jobs
export async function getAllJobs() {
  const headers = getAuthHeader()
  if (!headers) return []
  const res = await api.get('/jobs', { headers })
  return res.data
}

export async function getJobById(jobId) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.get(`/jobs/${jobId}`, { headers })
  return res.data
}

export async function createJob(jobData) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.post('/jobs', jobData, { headers })
  return res.data
}

export async function updateJob(jobId, jobData) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.put(`/jobs/${jobId}`, jobData, { headers })
  return res.data
}

export async function deleteJob(jobId) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.delete(`/jobs/${jobId}`, { headers })
  return res.data
}

export async function generateJobPDF(jobId) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.post(`/jobs/${jobId}/generate-pdf`, {}, { headers })
  return res.data
}

export async function sendJobPDFByEmail(jobId) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.post(`/jobs/${jobId}/send-email`, {}, { headers })
  return res.data
}

// Contacts
export async function getAllContacts() {
  const headers = getAuthHeader()
  if (!headers) return []
  const res = await api.get('/contacts', { headers })
  return res.data
}

export async function getContactById(contactId) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.get(`/contacts/${contactId}`, { headers })
  return res.data
}

export async function createContact(contactData) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.post('/contacts', contactData, { headers })
  return res.data
}

export async function updateContact(contactId, contactData) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.put(`/contacts/${contactId}`, contactData, { headers })
  return res.data
}

export async function deleteContact(contactId) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.delete(`/contacts/${contactId}`, { headers })
  return res.data
}

// Files
export async function getSecureFile(fileId) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.get(`/files/${fileId}`, { headers, responseType: 'blob' })
  return res.data
}

// Testimonials
export async function submitTestimonial({ authorName, content, rating }) {
  const res = await api.post('/testimonials', { authorName, content, rating })
  return res.data
}

export async function getApprovedTestimonials() {
  const res = await api.get('/testimonials')
  return res.data
}

export async function getAllTestimonials() {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.get('/testimonials/admin', { headers })
  return res.data
}

export async function approveTestimonial(id) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.put(`/testimonials/admin/${id}`, {}, { headers })
  return res.data
}

export async function deleteTestimonial(id) {
  const headers = getAuthHeader()
  if (!headers) throw new Error('Not authenticated')
  const res = await api.delete(`/testimonials/admin/${id}`, { headers })
  return res.data
}

export default api

