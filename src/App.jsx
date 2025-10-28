import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Preloader from './components/common/Preloader';
import Spinner from './components/common/Spinner';

const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const HomePage = lazy(() => import('./pages/public/HomePage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'));
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const AddJobPage = lazy(() => import('./pages/admin/AddJobPage'));
const JobDetailsPage = lazy(() => import('./pages/admin/JobDetailsPage'));
const EditJobPage = lazy(() => import('./pages/admin/EditJobPage'));
const ContactsListPage = lazy(() => import('./pages/admin/ContactsListPage'));
const AddContactPage = lazy(() => import('./pages/admin/AddContactPage'));
const EditContactPage = lazy(() => import('./pages/admin/EditContactPage'));
const TestimonialsAdminPage = lazy(() => import('./pages/admin/TestimonialsAdminPage'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minDisplayTime = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(minDisplayTime);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="preloader" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
          <Preloader />
        </motion.div>
      ) : (
        <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5 } }}>
          <BrowserRouter>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <Suspense fallback={
              <div className="fixed inset-0 flex items-center justify-center">
                <Spinner />
              </div>
            }>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/admin/login" element={<LoginPage />} />
                  <Route path="/admin" element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                      <Route path="dashboard" element={<DashboardPage />} />
                      <Route path="add-job" element={<AddJobPage />} />
                      <Route path="jobs/:jobId" element={<JobDetailsPage />} />
                      <Route path="jobs/:jobId/edit" element={<EditJobPage />} />
                      <Route path="contacts" element={<ContactsListPage />} />
                      <Route path="contacts/add" element={<AddContactPage />} />
                      <Route path="contacts/:contactId/edit" element={<EditContactPage />} />
                      <Route path="testimonials" element={<TestimonialsAdminPage />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;

