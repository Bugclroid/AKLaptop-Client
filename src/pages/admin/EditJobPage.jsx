import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllContacts, getJobById, updateJob } from '../../services/api'

export default function EditJobPage() {
  const { jobId } = useParams()
  const [contacts, setContacts] = useState([])
  const [loadingContacts, setLoadingContacts] = useState(true)
  const [loadingJob, setLoadingJob] = useState(true)

  const [contact, setContact] = useState('')
  const [productType, setProductType] = useState('laptop')
  const [productMakeModel, setProductMakeModel] = useState('')
  const [productSpecs, setProductSpecs] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [description, setDescription] = useState('')
  const [receivedDate, setReceivedDate] = useState('')
  const [status, setStatus] = useState('logged')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllContacts()
        setContacts(Array.isArray(data) ? data : [])
      } catch {
        setContacts([])
      } finally {
        setLoadingContacts(false)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const job = await getJobById(jobId)
        setContact(job.contact?._id || '')
        setProductType(job.productType || 'laptop')
        setProductMakeModel(job.productMakeModel || '')
        setProductSpecs(job.productSpecs || '')
        setServiceType(job.serviceType || '')
        setDescription(job.description || '')
        setReceivedDate(job.receivedDate ? new Date(job.receivedDate).toISOString().slice(0,10) : '')
        setStatus(job.status || 'logged')
      } catch {
        setError('Failed to load job')
      } finally {
        setLoadingJob(false)
      }
    })()
  }, [jobId])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const payload = {
        contact: contact || null,
        productType,
        productMakeModel,
        productSpecs,
        serviceType,
        description,
        receivedDate: receivedDate ? new Date(receivedDate).toISOString() : undefined,
        status,
      }
      await updateJob(jobId, payload)
      navigate(`/admin/jobs/${jobId}`)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update job')
    }
  }

  if (loadingJob) return <div className="flex items-center justify-center py-10">Loading job...</div>

  return (
    <div className="max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Job</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm mb-1">Contact</label>
          <select value={contact} onChange={e => setContact(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm">
            <option value="">Select a contact (optional)</option>
            {!loadingContacts && contacts.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Product Type</label>
          <select value={productType} onChange={e => setProductType(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm">
            <option value="laptop">Laptop</option>
            <option value="pc">PC</option>
            <option value="mobile">Mobile</option>
            <option value="tv">TV</option>
            <option value="projector">Projector</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Make / Model</label>
          <input value={productMakeModel} onChange={e => setProductMakeModel(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Specs</label>
          <input value={productSpecs} onChange={e => setProductSpecs(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Service Type</label>
          <input value={serviceType} onChange={e => setServiceType(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Received Date</label>
          <input type="date" value={receivedDate} onChange={e => setReceivedDate(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Status</label>
          <input value={status} onChange={e => setStatus(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div>
          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200">Save Changes</button>
        </div>
      </form>
    </div>
  )
}

