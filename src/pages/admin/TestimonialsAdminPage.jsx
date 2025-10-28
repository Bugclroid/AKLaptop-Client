import { useEffect, useState } from 'react'
import { getAllTestimonials, approveTestimonial, deleteTestimonial } from '../../services/api'
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function refetch() {
    const data = await getAllTestimonials()
    setItems(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    (async () => {
      try { await refetch() } finally { setLoading(false) }
    })()
  }, [])

  async function handleApprove(id) {
    try { await approveTestimonial(id); toast.success('Approved'); await refetch() } catch (_) { toast.error('Failed to approve') }
  }

  async function handleDelete(id) {
    const ok = window.confirm('Delete this testimonial?')
    if (!ok) return
    try { await deleteTestimonial(id); toast.success('Deleted'); await refetch() } catch (_) { toast.error('Failed to delete') }
  }

  if (loading) return <div className="flex items-center justify-center py-10"><Spinner /></div>

  return (
    <div className="p-4">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">Manage Testimonials</h1>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-xs sm:text-sm text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Author</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">Content</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Rating</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Status</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(t => (
              <tr key={t._id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-2 sm:py-3 px-3 sm:px-4">{t.authorName}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">{t.content}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">{t.rating || 5}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">{t.approved ? 'Approved' : 'Pending'}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 space-x-2">
                  {!t.approved && (
                    <button onClick={() => handleApprove(t._id)} className="inline-flex items-center justify-center rounded-md bg-green-600 py-1.5 px-3 text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors duration-200">Approve</button>
                  )}
                  <button onClick={() => handleDelete(t._id)} className="inline-flex items-center justify-center rounded-md bg-red-600 py-1.5 px-3 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

