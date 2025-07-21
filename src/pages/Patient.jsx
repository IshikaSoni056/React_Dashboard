// import { useState } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { addAppointment, getUsers } from "../utils/dbServices";

// const Patient = () => {
//   const { user, logout } = useAuth();
//   const [doctorId, setDoctorId] = useState("");
//   const [date, setDate] = useState("");

//   const doctors = getUsers().filter(u => u.role === "doctor");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!doctorId || !date) return alert("All fields required!");
//     addAppointment({
//       doctorId: parseInt(doctorId),
//       patientId: user.id,
//       date,
//     });
//     alert("Appointment booked!");
//     setDate("");
//     setDoctorId("");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Select Doctor</label>
//           <select
//             value={doctorId}
//             onChange={(e) => setDoctorId(e.target.value)}
//             className="border p-2 rounded w-full"
//           >
//             <option value="">-- Choose --</option>
//             {doctors.map((doc) => (
//               <option key={doc.id} value={doc.id}>
//                 {doc.name} ({doc.specialization})
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium">Appointment Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Book Appointment
//         </button>
//       </form>

//       <button onClick={logout} className="mt-8 bg-red-500 text-white px-4 py-2 rounded">
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Patient;

import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getShifts } from "../utils/roleUtils";
import { addAppointment, getAppointments, getUsers } from "../utils/dbServices";

const Patient = () => {
  const { user, logout } = useAuth();
  const [shifts, setShifts] = useState([]);
  const [selectedShiftId, setSelectedShiftId] = useState("");

  useEffect(() => {
    const allShifts = getShifts();
    const appointments = getAppointments();

    // Filter out booked shifts
    const booked = new Set(
      appointments.map(
        (a) => `${a.doctorId}-${a.date}-${a.time}`
      )
    );

    const available = allShifts.filter((s) => {
      const key = `${s.doctorId}-${s.date}-${s.time}`;
      const shiftDate = new Date(s.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !booked.has(key) && shiftDate >= today;
    });

    setShifts(available);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedShiftId) return alert("Please select a shift");

    const shift = shifts.find((s) => s.id === parseInt(selectedShiftId));

    addAppointment({
      doctorId: shift.doctorId,
      patientId: user.id,
      date: shift.date,
      time: shift.time,
      reason: "Not specified", // Optional enhancement
    });

    alert("Appointment booked!");
    setSelectedShiftId("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Select Available Shift</label>
          <select
            value={selectedShiftId}
            onChange={(e) => setSelectedShiftId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Choose --</option>
            {shifts.map((shift) => {
              const doctor = getUsers().find((u) => u.id === shift.doctorId);
              return (
                <option key={shift.id} value={shift.id}>
                  Dr. {doctor?.name} | {shift.date} | {shift.time}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Book Appointment
        </button>
      </form>

      <button
        onClick={logout}
        className="mt-8 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Patient;

