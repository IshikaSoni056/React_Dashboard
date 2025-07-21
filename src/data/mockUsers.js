export const initialDB = {
  users: [
    { id: 1, name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" },
    { id: 2, name: "Dr. John Doe", email: "dr.john@example.com", password: "doctor123", role: "doctor" },
    { id: 3, name: "Dr. Jane Smith", email: "dr.jane@example.com", password: "doctor123", role: "doctor" },
    { id: 4, name: "Alice", email: "alice@example.com", password: "patient123", role: "patient" },
    { id: 5, name: "Bob", email: "bob@example.com", password: "patient123", role: "patient" },
    { id: 6, name: "Charlie", email: "charlie@example.com", password: "patient123", role: "patient" },
    { id: 7, name: "David", email: "david@example.com", password: "patient123", role: "patient" },
    { id: 8, name: "Dr. Peter", email: "peter@example.com", password: "doctor123", role: "doctor" },
    { id: 9, name: "Emily", email: "emily@example.com", password: "patient123", role: "patient" },
    { id: 10, name: "Dr. Anna", email: "anna@example.com", password: "doctor123", role: "doctor" }
  ],
  appointments: [
    {
      id: 1,
      patientId: 3,
      doctorId: 2,
      date: "2025-07-22",
      time: "10:00",
      reason: "Regular check-up"
    }
  ]
};