import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { loginUser } from '../../services/api.js'
import { IconShield, IconLock, IconUser, IconKey } from '@tabler/icons-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await loginUser({ username, password })
      login(data)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-lg shadow-black/20 inline-block">
            <IconShield className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-slate-300 mt-2">Secure access to AKLaptop management</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-2xl shadow-black/20">
          <div className="text-center mb-8">
            <IconLock className="mx-auto h-8 w-8 text-green-400 mb-3" />
            <h2 className="text-2xl font-semibold text-white">Sign In</h2>
            <p className="text-slate-400 text-sm mt-1">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2 flex items-center">
                <IconUser className="h-4 w-4 mr-2 text-blue-400" />
                Username
              </label>
              <div className="relative">
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="block w-full rounded-xl border border-white/20 py-3 px-4 pl-12 bg-white/5 backdrop-blur-sm text-white shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-400/50 focus:border-blue-400/50 text-sm transition-all duration-200"
                  placeholder="Enter your username"
                />
                <IconUser className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2 flex items-center">
                <IconKey className="h-4 w-4 mr-2 text-green-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-white/20 py-3 px-4 pl-12 bg-white/5 backdrop-blur-sm text-white shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-400/50 focus:border-green-400/50 text-sm transition-all duration-200"
                  placeholder="Enter your password"
                />
                <IconKey className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 flex items-center">
                <div className="text-red-400 text-sm">{error}</div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-green-600/20 backdrop-blur-md border border-white/30 py-4 px-6 text-sm font-semibold text-white shadow-lg shadow-black/20 hover:bg-white/15 hover:border-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 transition-all duration-200"
            >
              <IconShield className="h-4 w-4" />
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              Secure administrative access for AKLaptop management
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

