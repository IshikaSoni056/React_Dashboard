// import { getFromStorage } from "../utils/dbServices";


// const Doctor = () => {
//   const doctorId = 2; // Simulated logged-in doctor
//   const appointments = getFromStorage("appointments").filter(a => a.doctorId == doctorId);
//   const users = getFromStorage("users");

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Appointments for You</h2>
//       {appointments.map(app => {
//         const patient = users.find(u => u.id === app.patientId);
//         return (
//           <div key={app.id} className="mb-4 p-4 bg-gray-100 rounded">
//             <p><strong>Patient:</strong> {patient?.name}</p>
//             <p><strong>Date:</strong> {app.date} <strong>Time:</strong> {app.time}</p>
//             <p><strong>Reason:</strong> {app.reason}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Doctor;


import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getShifts } from "../utils/roleUtils";
import { getAppointments, getUsers } from "../utils/dbServices";
import { addShift } from "../utils/roleUtils";
import { removeShift } from "../utils/roleUtils";

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
    if (!date || !time) return alert("Date & Time required");
    addShift({ doctorId: user.id, date, time });
    alert("Shift added!");
    setDate(""); setTime("");
    setShifts(getShifts().filter(shift => shift.doctorId === user.id));
  };

  const handleDeleteShift = (id) => {
    removeShift(id);
    setShifts(getShifts().filter(shift => shift.doctorId === user.id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

      <h2 className="text-xl font-semibold mb-2">My Appointments</h2>
      <ul className="mb-6">
        {appointments.length === 0 ? (
          <li>No appointments</li>
        ) : (
          appointments.map(appt => {
            const patient = getUsers().find(u => u.id === appt.patientId);
            return (
              <li key={appt.id}>
                🧑‍🤝‍🧑 Patient: {patient?.name} | 📅 Date: {appt.date} | 🕑 Time: {appt.time}
              </li>
            );
          })
        )}
      </ul>

      <h2 className="text-xl font-semibold mb-2">My Available Shifts</h2>
      <ul className="mb-4">
        {shifts.length === 0 ? (
          <li>No shifts set</li>
        ) : (
          shifts.map(shift => (
            <li key={shift.id}>
              📅 {shift.date} | 🕑 {shift.time}
              <button onClick={() => handleDeleteShift(shift.id)} className="ml-2 text-red-500">❌</button>
            </li>
          ))
        )}
      </ul>

      <form onSubmit={handleShiftAdd} className="space-y-2">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={time}
          onChange={e => setTime(e.target.value)}
          placeholder="e.g. 10:00 AM - 12:00 PM"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Shift
        </button>
      </form>

      <button onClick={logout} className="mt-8 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default DoctorDashboard;
