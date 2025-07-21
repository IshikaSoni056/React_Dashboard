import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { mockStats } from "../data/mockdata";

import { addUser, getLocalData, removeUser } from "../utils/storage";


const initialUsers = [
  { id: 1, name: "Dr. Rajeev", role: "Doctor", email: "rajeev@hospital.com" },
  { id: 2, name: "Aman Kumar", role: "Patient", email: "aman@gmail.com" },
];


const Admin = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "Patient" });

    const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);


   useEffect(() => {
    setDoctors(getLocalData("doctors"));
    setPatients(getLocalData("patients"));
  }, []);

  const handleAddUser = (role) => {
    const name = prompt(`Enter ${role} name:`);
    if (!name) return;
    const newUser = {
      id: Date.now(),
      name,
      email: `${name}@mail.com`,
      role
    };
    addUser(newUser, role);
    role === "doctors" ? setDoctors([...doctors, newUser]) : setPatients([...patients, newUser]);
  };

  const handleRemove = (id, role) => {
    removeUser(id, role);
    role === "doctors" ? setDoctors(getLocalData("doctors")) : setPatients(getLocalData("patients"));
  };


  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "Patient" });
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      // Update
      setUsers(users.map((u) => (u.id === editingUser.id ? formData : u)));
    } else {
      // Add new
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
  };


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-6">
        <h2 className="text-2xl font-semibold mb-8">🩺 Admin Panel</h2>
        <nav className="space-y-3">
          <button
            className={`block w-full text-left py-2 px-4 rounded hover:bg-gray-700 ${activeTab === 'dashboard' && 'bg-gray-700'}`}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </button>
          <button
            className={`block w-full text-left py-2 px-4 rounded hover:bg-gray-700 ${activeTab === 'users' && 'bg-gray-700'}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Users
          </button>
          <button
            className={`block w-full text-left py-2 px-4 rounded hover:bg-gray-700 ${activeTab === 'appointments' && 'bg-gray-700'}`}
            onClick={() => setActiveTab("appointments")}
          >
            📅 Appointments
          </button>
        </nav>
        <button
          onClick={logout}
          className="mt-12 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
        >
         Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-8">
        {activeTab === "users" && (
          <div>
            <h1 className="text-3xl font-bold mb-4"> Manage Users</h1>
            <button
              onClick={handleAddNew}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ➕ Add New User
            </button>

            <table className="w-full bg-white rounded-xl shadow overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Role</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-purple-600 text-white px-2 py-1 rounded"
                      >
                         Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                         Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-10">
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-white p-6 rounded-xl shadow space-y-4 w-full max-w-md"
                >
                  <h2 className="text-2xl font-semibold">
                    {editingUser ? "Edit User" : "Add User"}
                  </h2>
                  <input
                    className="w-full border p-2 rounded"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    className="w-full border p-2 rounded"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <select
                    className="w-full border p-2 rounded"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      {editingUser ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === "appointments" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">📅 Appointments</h1>
            <p>View and manage appointment schedules.</p>
          </div>        
        )}
        {activeTab === "dashboard" && (
  <div>
    <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow text-center">
        <h2 className="text-xl font-semibold text-gray-700"> Registered Doctors</h2>
        <p className="text-3xl font-bold text-blue-600 mt-2">{mockStats.doctors}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow text-center">
        <h2 className="text-xl font-semibold text-gray-700"> Registered Patients</h2>
        <p className="text-3xl font-bold text-green-600 mt-2">{mockStats.patients}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow text-center">
        <h2 className="text-xl font-semibold text-gray-700"> Total Appointments</h2>
        <p className="text-3xl font-bold text-indigo-600 mt-2">{mockStats.appointments}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow text-center">
        <h2 className="text-xl font-semibold text-gray-700"> Active Users Today</h2>
        <p className="text-3xl font-bold text-red-600 mt-2">{mockStats.activeUsersToday}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow text-center">
        <h2 className="text-xl font-semibold text-gray-700"> Completed Appointments</h2>
        <p className="text-3xl font-bold text-teal-600 mt-2">{mockStats.completedAppointments}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow text-center">
        <h2 className="text-xl font-semibold text-gray-700"> Upcoming Appointments</h2>
        <p className="text-3xl font-bold text-orange-600 mt-2">{mockStats.upcomingAppointments}</p>
      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
};

export default Admin;
