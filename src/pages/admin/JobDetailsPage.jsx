import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getJobById, deleteJob, generateJobPDF, getSecureFile, sendJobPDFByEmail } from '../../services/api'
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'

export default function JobDetailsPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  async function refetch() {
    const data = await getJobById(jobId)
    setJob(data)
  }

  useEffect(() => {
    (async () => {
      try {
        await refetch()
      } catch {
        setJob(null)
      } finally {
        setLoading(false)
      }
    })()
  }, [jobId])

  async function handleDelete() {
    const ok = window.confirm('Are you sure you want to delete this job permanently?')
    if (!ok) return
    try {
      await deleteJob(jobId)
      toast.success('Job deleted')
      navigate('/admin/dashboard')
    } catch (_) { toast.error('Failed to delete job') }
  }

  async function handleGeneratePDF() {
    try {
      setIsGenerating(true)
      await generateJobPDF(jobId)
      await refetch()
      toast.success('PDF generated')
    } catch (_) { toast.error('Failed to generate PDF') } finally {
      setIsGenerating(false)
    }
  }

  async function handleViewPDF() {
    if (!job?.pdfFileId) return
    try {
      const blob = await getSecureFile(job.pdfFileId)
      const fileURL = URL.createObjectURL(blob)
      window.open(fileURL, '_blank')
    } catch (_) { toast.error('Failed to open PDF') }
  }

  async function handleSendEmail() {
    if (!job?.pdfFileId || !job?.contact?.email) return
    const ok = window.confirm(`Are you sure you want to email the receipt to ${job.contact.email}?`)
    if (!ok) return
    try {
      setIsSendingEmail(true)
      await sendJobPDFByEmail(jobId)
      toast.success('Email sent')
    } catch (_) {
      toast.error('Failed to send email')
    } finally {
      setIsSendingEmail(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center py-10"><Spinner /></div>
  if (!job) return <div className="p-4">Job not found</div>

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold">Job Details</h1>
        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          <button onClick={handleGeneratePDF} disabled={isGenerating} className="col-span-2 sm:col-span-1 inline-flex items-center justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200">{isGenerating ? 'Generating…' : 'Generate PDF'}</button>
          {job.pdfFileId && (
            <>
              <button onClick={handleViewPDF} className="col-span-1 inline-flex items-center justify-center rounded-md bg-gray-800 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors duration-200">View PDF</button>
              {job.contact?.email && (
                <button onClick={handleSendEmail} disabled={isSendingEmail} className="col-span-1 inline-flex items-center justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors duration-200">{isSendingEmail ? 'Sending…' : 'Send PDF by Email'}</button>
              )}
            </>
          )}
          <Link to={`/admin/jobs/${job._id}/edit`} className="col-span-1 inline-flex items-center justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200">Edit Job</Link>
          <button onClick={handleDelete} className="col-span-1 inline-flex items-center justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200">Delete Job</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-slate-700 rounded-lg p-4 bg-slate-800/30">
          <h2 className="font-semibold mb-2">General</h2>
          <dl className="space-y-1 text-sm">
            <div className="flex"><dt className="w-40 text-gray-600">Job ID</dt><dd>{job._id}</dd></div>
            <div className="flex"><dt className="w-40 text-gray-600">Status</dt><dd>{job.status}</dd></div>
            <div className="flex"><dt className="w-40 text-gray-600">Received Date</dt><dd>{job.receivedDate ? new Date(job.receivedDate).toLocaleDateString() : ''}</dd></div>
          </dl>
        </div>
        <div className="border border-slate-700 rounded-lg p-4 bg-slate-800/30">
          <h2 className="font-semibold mb-2">Contact</h2>
          <dl className="space-y-1 text-sm">
            <div className="flex"><dt className="w-40 text-gray-600">Name</dt><dd>{job.contact?.name || '—'}</dd></div>
            <div className="flex"><dt className="w-40 text-gray-600">Email</dt><dd>{job.contact?.email || '—'}</dd></div>
            <div className="flex"><dt className="w-40 text-gray-600">Phone</dt><dd>{job.contact?.phone || '—'}</dd></div>
          </dl>
        </div>
        <div className="border border-slate-700 rounded-lg p-4 bg-slate-800/30">
          <h2 className="font-semibold mb-2">Product</h2>
          <dl className="space-y-1 text-sm">
            <div className="flex"><dt className="w-40 text-gray-600">Type</dt><dd>{job.productType}</dd></div>
            <div className="flex"><dt className="w-40 text-gray-600">Make/Model</dt><dd>{job.productMakeModel || '—'}</dd></div>
            <div className="flex"><dt className="w-40 text-gray-600">Specs</dt><dd>{job.productSpecs || '—'}</dd></div>
            <div className="flex"><dt className="w-40 text-gray-600">Service Type</dt><dd>{job.serviceType || '—'}</dd></div>
            <div className="flex"><dt className="w-40 text-gray-600">Description</dt><dd>{job.description || '—'}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  )
}

