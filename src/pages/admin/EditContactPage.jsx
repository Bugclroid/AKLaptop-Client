import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getContactById, updateContact } from '../../services/api'

export default function EditContactPage() {
  const { contactId } = useParams()
  const [name, setName] = useState('')
  const [type, setType] = useState('customer')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const c = await getContactById(contactId)
        setName(c.name || '')
        setType(c.type || 'customer')
        setPhone(c.phone || '')
        setEmail(c.email || '')
        setAddress(c.address || '')
        setNotes(c.notes || '')
      } catch {
        setError('Failed to load contact')
      } finally {
        setLoading(false)
      }
    })()
  }, [contactId])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await updateContact(contactId, { name, type, phone, email, address, notes })
      navigate('/admin/contacts')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update contact')
    }
  }

  if (loading) return <div className="flex items-center justify-center py-10">Loading contact...</div>

  return (
    <div className="max-w-xl p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">Edit Contact</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm">
            <option value="customer">Customer</option>
            <option value="dealer">Dealer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Address</label>
          <input value={address} onChange={e => setAddress(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="block w-full rounded-md border-0 py-2 px-4 bg-slate-800 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm" />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div>
          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200">Save Changes</button>
        </div>
      </form>
    </div>
  )
}

