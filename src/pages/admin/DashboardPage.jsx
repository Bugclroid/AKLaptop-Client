import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllJobs } from '../../services/api';
import Spinner from '../../components/common/Spinner';

export default function DashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllJobs();
        setJobs(Array.isArray(data) ? data : []);
      } catch (e) {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const total = jobs.length;
    const byStatus = jobs.reduce((acc, j) => {
      const key = (j.status || 'unknown').toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return {
      total,
      logged: byStatus.logged || 0,
      diagnosing: byStatus.diagnosing || 0,
      in_progress: byStatus.in_progress || 0,
      awaiting_parts: byStatus.awaiting_parts || 0,
      ready_for_pickup: byStatus.ready_for_pickup || 0,
      completed: byStatus.completed || 0,
    };
  }, [jobs]);

  if (loading) return <div className="flex items-center justify-center py-10"><Spinner /></div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Jobs</h1>
        <button onClick={() => navigate('/admin/add-job')} className="bg-black text-white px-3 py-2 rounded text-sm">Create New Job</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Logged" value={stats.logged} />
        <StatCard label="Diagnosing" value={stats.diagnosing} />
        <StatCard label="In Progress" value={stats.in_progress} />
        <StatCard label="Awaiting Parts" value={stats.awaiting_parts} />
        <StatCard label="Ready for Pickup" value={stats.ready_for_pickup} />
        <StatCard label="Completed" value={stats.completed} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-xs sm:text-sm text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Job ID</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Customer</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">Product</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4">Status</th>
              <th className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">Received</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-2 sm:py-3 px-3 sm:px-4"><Link to={`/admin/jobs/${job._id}`} className="hover:underline">{job._id.slice(-6)}</Link></td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">{job.contact?.name || '—'}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">{job.productMakeModel || job.productType}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4">{job.status}</td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">{job.receivedDate ? new Date(job.receivedDate).toLocaleDateString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }){
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-3 sm:p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-lg sm:text-2xl font-semibold text-white">{value}</div>
    </div>
  )
}

