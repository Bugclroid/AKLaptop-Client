import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllContacts, deleteContact } from '../../services/api'
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'

export default function ContactsListPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  async function refetch() {
    const data = await getAllContacts()
    setContacts(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    (async () => {
      try {
        await refetch()
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function handleDelete(id) {
    const ok = window.confirm('Delete this contact?')
    if (!ok) return
    try {
      await deleteContact(id)
      toast.success('Contact deleted')
      await refetch()
    } catch (_) { toast.error('Failed to delete contact') }
  }

  if (loading) return <div className="flex items-center justify-center py-10"><Spinner /></div>

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Contacts</h1>
        <Link to="/admin/contacts/add" className="bg-black text-white px-3 py-2 rounded text-sm">Create New Contact</Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-xs sm:text-sm text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Name</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Type</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">Email</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">Phone</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-2 sm:py-3 px-3 sm:px-4">{c.name}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">{c.type}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">{c.email || '—'}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">{c.phone || '—'}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 space-x-2">
                  <Link to={`/admin/contacts/${c._id}/edit`} className="inline-flex items-center justify-center rounded-md bg-indigo-600 py-1.5 px-3 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200">Edit</Link>
                  <button onClick={() => handleDelete(c._id)} className="inline-flex items-center justify-center rounded-md bg-red-600 py-1.5 px-3 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

