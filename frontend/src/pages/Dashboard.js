import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'appointments', 'patients'
  const [patientSearch, setPatientSearch] = useState('');
  const [aptSearch, setAptSearch] = useState('');
  const [selectedApt, setSelectedApt] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const getAuthHeaders = (additionalHeaders = {}) => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      ...additionalHeaders
    };
  };

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/appointments', {
        headers: getAuthHeaders()
      });
      if (response.status === 401 || response.status === 403) {
        handleLogout();
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ status })
      });
      if (response.status === 401 || response.status === 403) {
        handleLogout();
        return;
      }
      if (!response.ok) throw new Error('Failed to update status');
      fetchAppointments();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.status === 401 || response.status === 403) {
        handleLogout();
        return;
      }
      if (!response.ok) throw new Error('Failed to delete appointment');
      fetchAppointments();
    } catch (err) {
      alert('Error deleting appointment: ' + err.message);
    }
  };

  // Dynamic Patient Deduplication Aggregator
  const getUniquePatients = () => {
    const patientsMap = {};
    appointments.forEach(apt => {
      const key = apt.email ? apt.email.toLowerCase().trim() : apt.phone;
      if (!key) return;
      
      if (!patientsMap[key]) {
        patientsMap[key] = {
          name: apt.patientName,
          email: apt.email,
          phone: apt.phone,
          appointmentsCount: 0,
          lastVisit: null,
          latestStatus: null,
          appointmentsList: []
        };
      }
      
      patientsMap[key].appointmentsCount += 1;
      patientsMap[key].appointmentsList.push(apt);
      
      const currentAptDate = new Date(apt.appointmentDate);
      if (!patientsMap[key].lastVisit || currentAptDate > new Date(patientsMap[key].lastVisit)) {
        patientsMap[key].lastVisit = apt.appointmentDate;
        patientsMap[key].latestStatus = apt.status;
      }
    });

    // Return and filter based on search query
    return Object.values(patientsMap).filter(p => 
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.email.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.phone.includes(patientSearch)
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200">Pending</span>;
      case 'CONFIRMED':
        return <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-full border border-sky-200">Confirmed</span>;
      case 'COMPLETED':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">Completed</span>;
      case 'CANCELLED':
        return <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full border border-rose-200">Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full border border-gray-200">{status}</span>;
    }
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => 
    apt.patientName.toLowerCase().includes(aptSearch.toLowerCase()) ||
    apt.service.toLowerCase().includes(aptSearch.toLowerCase())
  );

  const uniquePatients = getUniquePatients();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shadow-xl z-10">
        <div>
          {/* Branding Header */}
          <div className="px-6 py-6 flex items-center gap-3 border-b border-slate-800">
            <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
              D
            </div>
            <div>
              <h2 className="text-white font-display font-bold tracking-wide text-lg leading-tight">DoctorPortal</h2>
              <p className="text-xs text-slate-400">BrightSmile Dental</p>
            </div>
          </div>

          {/* Sidebar Navigation Links */}
          <nav className="mt-8 px-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                activeTab === 'overview' 
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <DashboardIcon fontSize="small" />
              Overview
            </button>
            
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                activeTab === 'appointments' 
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <EventIcon fontSize="small" />
              Appointments
            </button>
            
            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                activeTab === 'patients' 
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <PeopleIcon fontSize="small" />
              Patients Directory
            </button>
          </nav>
        </div>

        {/* Sidebar Footer - User Context & Logout */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between px-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-slate-300">
                DR
              </div>
              <div>
                <p className="text-xs font-bold text-white">Dr. Admin</p>
                <p className="text-[10px] text-slate-400">Dentist Chief</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm"
          >
            <LogoutIcon fontSize="small" />
            Log Out System
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
        
        {/* Universal Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-0">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight capitalize">
              {activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'appointments' ? 'Manage Appointments' : 'Patients Directory'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchAppointments}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-xs font-bold text-gray-700 transition-all"
            >
              <RefreshIcon fontSize="inherit" className={loading ? 'animate-spin text-sky-500' : 'text-sky-500'} />
              Refresh Data
            </button>
          </div>
        </header>

        {/* Scrollable Workspace Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-xl shadow-sm flex items-center justify-between">
              <span>Error: {error}</span>
              <button onClick={() => setError(null)} className="text-xs hover:underline">Dismiss</button>
            </div>
          )}

          {/* =================== OVERVIEW VIEW =================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Main Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Appointments', value: appointments.length, color: 'bg-sky-600', desc: 'All bookings received' },
                  { label: 'Pending Approvals', value: appointments.filter(a => a.status === 'PENDING').length, color: 'bg-amber-500', desc: 'Awaiting confirmation' },
                  { label: 'Active Patients', value: getUniquePatients().length, color: 'bg-purple-600', desc: 'Distinct treated profiles' },
                  { label: 'Confirmed Schedules', value: appointments.filter(a => a.status === 'CONFIRMED').length, color: 'bg-emerald-500', desc: 'Confirmed consultations' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start relative overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="relative z-10">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                      <h3 className="text-3xl font-black text-slate-800 mt-2 tracking-tight">{stat.value}</h3>
                      <p className="text-xs text-gray-500 mt-1">{stat.desc}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.color} bg-opacity-10 flex items-center justify-center text-slate-800 z-10 relative`}>
                      <EventIcon className="text-slate-700 opacity-80" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Welcome & Quick Action Hub */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gradient-to-r from-sky-600 to-sky-700 text-white p-8 rounded-2xl shadow-lg shadow-sky-600/10 flex flex-col justify-between h-64 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Welcome back, Dr. Admin!</h3>
                    <p className="text-sky-100 text-sm max-w-md">You have {appointments.filter(a => a.status === 'PENDING').length} pending appointments waiting for approval. Your next confirmation slots are clear.</p>
                  </div>
                  <div className="relative z-10 flex items-center gap-4">
                    <button onClick={() => setActiveTab('appointments')} className="px-5 py-2.5 bg-white text-sky-700 rounded-xl text-xs font-bold shadow hover:bg-sky-50 transition-all">View Schedule</button>
                    <button onClick={() => setActiveTab('patients')} className="px-5 py-2.5 bg-sky-500/40 text-white rounded-xl text-xs font-bold hover:bg-sky-500/60 border border-sky-400/40 transition-all">Browse Patients</button>
                  </div>
                  <div className="absolute -right-10 -bottom-10 opacity-10 transform scale-150">
                    <EventIcon style={{ fontSize: 200 }} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-64">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">System Highlights</h4>
                    <ul className="space-y-3.5 text-xs">
                      <li className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">Database Synchronization</span>
                        <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Operational</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">Security Framework</span>
                        <span className="font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">Spring / JWT</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">Total Patient Treatments</span>
                        <span className="font-bold text-slate-700">{appointments.filter(a => a.status === 'COMPLETED').length}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center gap-3 text-xs text-slate-600 font-semibold">
                    <CheckCircleIcon fontSize="small" className="text-sky-500" />
                    Real-time MySQL backend is active.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================== APPOINTMENTS VIEW =================== */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              {/* Filter Controls */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 justify-between">
                <div className="flex-1 relative max-w-md">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fontSize="small" />
                  <input 
                    type="text"
                    placeholder="Search patient or service..."
                    value={aptSearch}
                    onChange={(e) => setAptSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase">
                  Showing {filteredAppointments.length} records
                </div>
              </div>

              {/* Table Wrapper */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Details</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Scheduled</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Treatment / Service</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Current Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action Menu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {loading && appointments.length === 0 ? (
                        <tr><td colSpan="6" className="px-6 py-16 text-center text-slate-400 font-bold">Retaining cloud data...</td></tr>
                      ) : filteredAppointments.length === 0 ? (
                        <tr><td colSpan="6" className="px-6 py-16 text-center text-slate-400 font-semibold">No corresponding matches found.</td></tr>
                      ) : (
                        filteredAppointments.map((apt) => (
                          <tr key={apt.id} className="hover:bg-sky-50/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-black text-slate-800">{apt.patientName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600">
                              <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
                                <EmailIcon style={{ fontSize: 13 }} className="text-slate-400" /> {apt.email}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <PhoneIcon style={{ fontSize: 13 }} className="text-slate-400" /> {apt.phone}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md">{apt.appointmentDate}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-semibold text-slate-700">{apt.service}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(apt.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right space-x-1">
                              <button 
                                onClick={() => setSelectedApt(apt)}
                                title="View Consultation Details"
                                className="p-2 text-slate-500 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl transition-all inline-flex mr-1.5 shadow-sm"
                              >
                                <VisibilityIcon fontSize="small" />
                              </button>
                              {apt.status === 'PENDING' && (
                                <button 
                                  onClick={() => updateStatus(apt.id, 'CONFIRMED')}
                                  title="Confirm Booking"
                                  className="p-2 text-sky-600 hover:bg-sky-50 border border-sky-100 hover:border-sky-200 rounded-xl transition-all inline-flex"
                                >
                                  <CheckCircleIcon fontSize="small" />
                                </button>
                              )}
                              {(apt.status === 'PENDING' || apt.status === 'CONFIRMED') && (
                                <button 
                                  onClick={() => updateStatus(apt.id, 'COMPLETED')}
                                  title="Mark Treatment Completed"
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-200 rounded-xl transition-all inline-flex"
                                >
                                  <DoneAllIcon fontSize="small" />
                                </button>
                              )}
                              {(apt.status === 'PENDING' || apt.status === 'CONFIRMED') && (
                                <button 
                                  onClick={() => updateStatus(apt.id, 'CANCELLED')}
                                  title="Cancel Case"
                                  className="p-2 text-amber-600 hover:bg-amber-50 border border-amber-100 hover:border-amber-200 rounded-xl transition-all inline-flex"
                                >
                                  <CancelIcon fontSize="small" />
                                </button>
                              )}
                              <button 
                                onClick={() => deleteAppointment(apt.id)}
                                title="Purge Record"
                                className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-100 hover:border-rose-200 rounded-xl transition-all inline-flex"
                              >
                                <DeleteIcon fontSize="small" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =================== PATIENTS DIRECTORY VIEW =================== */}
          {activeTab === 'patients' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 justify-between">
                <div className="flex-1 relative max-w-md">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fontSize="small" />
                  <input 
                    type="text"
                    placeholder="Search patients directory by name, email or phone..."
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase">
                  Displaying {uniquePatients.length} Total unique patients
                </div>
              </div>

              {/* Patients Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading && appointments.length === 0 ? (
                  <div className="col-span-full text-center py-16 text-slate-400 font-bold">Loading patient directories...</div>
                ) : uniquePatients.length === 0 ? (
                  <div className="col-span-full text-center py-16 text-slate-400 font-bold">No patient clinical profiles exist matching that name.</div>
                ) : (
                  uniquePatients.map((pat, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4">
                        <span className="text-[10px] font-black text-sky-600 bg-sky-50 px-2 py-1 rounded-md uppercase border border-sky-100 shadow-sm">
                          {pat.appointmentsCount} {pat.appointmentsCount === 1 ? 'Visit' : 'Visits'}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold uppercase tracking-wide shadow-inner group-hover:from-sky-500 group-hover:to-sky-600 group-hover:text-white transition-all duration-300">
                            <PersonIcon />
                          </div>
                          <div>
                            <h4 className="font-black text-slate-800 group-hover:text-sky-600 transition-colors truncate max-w-[150px]">{pat.name}</h4>
                            <p className="text-[11px] text-slate-400 font-bold">ID: PAT-{(100 + idx)}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mt-2 pt-3 border-t border-slate-50 text-xs">
                          <div className="flex items-center gap-2 text-slate-600">
                            <EmailIcon style={{ fontSize: 14 }} className="text-slate-400" />
                            <span className="truncate">{pat.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <PhoneIcon style={{ fontSize: 14 }} className="text-slate-400" />
                            <span>{pat.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-dashed border-slate-100 flex items-center justify-between text-xs bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                        <div>
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">Last Visit On</span>
                          <span className="font-bold text-slate-700">{pat.lastVisit}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">Status</span>
                          <span className="inline-block scale-90 transform origin-right">{getStatusBadge(pat.latestStatus)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </main>
      {/* Consultation Details Modal Overlay */}
      {selectedApt && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 max-w-md w-full overflow-hidden relative transform scale-in transition-all duration-300">
            <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-6 flex justify-between items-start shadow-inner">
              <div>
                <span className="text-sky-200 font-black text-[9px] uppercase tracking-widest bg-sky-500/30 px-2 py-0.5 rounded-full">Consultation Case Note</span>
                <h3 className="text-xl font-black mt-2 truncate max-w-[250px]">{selectedApt.patientName}</h3>
              </div>
              <button 
                onClick={() => setSelectedApt(null)} 
                className="p-1.5 bg-white/10 hover:bg-white/20 hover:rotate-90 text-white rounded-xl transition-all duration-300 shadow-sm border border-white/5"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
            <div className="p-6 space-y-5 bg-slate-50/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-slate-400 font-extrabold block mb-1 text-[10px] uppercase tracking-wider">Schedule</span>
                  <span className="font-black text-slate-800 text-xs tracking-wide">{selectedApt.appointmentDate}</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-slate-400 font-extrabold block mb-1 text-[10px] uppercase tracking-wider">Requested Service</span>
                  <span className="font-black text-sky-700 text-xs tracking-wide truncate block">{selectedApt.service}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm relative group">
                <span className="text-slate-400 font-extrabold block mb-2 text-[10px] uppercase tracking-wider">Patient Reported Problem / Note</span>
                <p className="text-slate-700 italic text-xs font-medium leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 min-h-[70px] max-h-[150px] overflow-y-auto">
                  {selectedApt.message || "No specific additional details were provided by the patient for this booking."}
                </p>
              </div>

              <div className="border-t border-slate-200/60 pt-4 flex gap-3">
                <a 
                  href={`mailto:${selectedApt.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all hover:border-slate-300 shadow-sm"
                >
                  <EmailIcon style={{ fontSize: 14 }} />
                  Email
                </a>
                <a 
                  href={`tel:${selectedApt.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 border border-sky-500 rounded-xl text-xs font-bold text-white hover:bg-sky-700 transition-all shadow-md shadow-sky-600/20"
                >
                  <PhoneIcon style={{ fontSize: 14 }} />
                  Direct Dial
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
