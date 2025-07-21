import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getShifts, addShift, removeShift } from "../utils/roleUtils";
import { getAppointments, getUsers } from "../utils/dbServices";

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const allAppointments = getAppointments();
    const myAppointments = allAppointments.filter(appt => appt.doctorId === user.id);
    setAppointments(myAppointments);

    const myShifts = getShifts().filter(shift => shift.doctorId === user.id);
    setShifts(myShifts);
  }, [user.id]);

  const handleShiftAdd = (e) => {
    e.preventDefault();
    if (!date || !time) return alert("Date and Time are required");
    addShift({ doctorId: user.id, date, time });
    setDate(""); setTime("");
    setShifts(getShifts().filter(shift => shift.doctorId === user.id));
    alert("Shift added successfully");
  };

  const handleDeleteShift = (id) => {
    removeShift(id);
    setShifts(getShifts().filter(shift => shift.doctorId === user.id));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-xl shadow">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Doctor Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Appointments */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">My Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="space-y-2">
            {appointments.map(appt => {
              const patient = getUsers().find(u => u.id === appt.patientId);
              return (
                <div
                  key={appt.id}
                  className="bg-gray-100 p-4 rounded border flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-800 font-medium">Patient: {patient?.name || "Unknown"}</p>
                    <p className="text-sm text-gray-600">Date: {appt.date} | Time: {appt.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Shifts */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">My Available Shifts</h2>
        {shifts.length === 0 ? (
          <p className="text-gray-500">No shifts added yet.</p>
        ) : (
          <ul className="space-y-2">
            {shifts.map(shift => (
              <li
                key={shift.id}
                className="bg-gray-50 p-4 rounded border flex justify-between items-center"
              >
                <span className="text-gray-800">
                  {shift.date} | {shift.time}
                </span>
                <button
                  onClick={() => handleDeleteShift(shift.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add Shift Form */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Shift</h2>
        <form onSubmit={handleShiftAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="text"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="e.g. 10:00 AM - 12:00 PM"
              className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Add Shift
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default DoctorDashboard;
