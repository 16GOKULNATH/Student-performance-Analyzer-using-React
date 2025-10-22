import React, { useState } from "react";

const StudentCard = ({ student, fetchStudents }) => {
  const [editMode, setEditMode] = useState(false);
  const [marks, setMarks] = useState(student.marks);

  const handleChange = (e) =>
    setMarks({ ...marks, [e.target.name]: Number(e.target.value) });

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/students/${student.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marks }),
    });
    setEditMode(false);
    fetchStudents();
  };

  // ✅ Dynamic phone input for sending SMS
  const handleSendReport = async () => {
    const phone = prompt(
      "Enter the student's phone number (with country code, e.g. +91):"
    );
    if (!phone) {
      alert("Phone number is required!");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: student.name,
          regno: student.regno,
          marks: student.marks,
          phone: phone,
        }),
      });
      alert("Report sent via SMS!");
    } catch (error) {
      console.error("Error sending SMS:", error);
      alert("Failed to send SMS. Check console for details.");
    }
  };

  return (
    <div className="student-card">
      <div className="student-details">
        <h3>{student.name}</h3>
        <p>Reg No: {student.regno}</p>

        {editMode ? (
          <>
            <input name="Maths" value={marks.Maths} onChange={handleChange} />
            <input
              name="Science"
              value={marks.Science}
              onChange={handleChange}
            />
            <input
              name="English"
              value={marks.English}
              onChange={handleChange}
            />
            <button onClick={handleSave} className="edit-btn">
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="delete-btn"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p>Maths: {student.marks.Maths}</p>
            <p>Science: {student.marks.Science}</p>
            <p>English: {student.marks.English}</p>

            <div className="student-actions">
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={async () => {
                  await fetch(
                    `http://localhost:5000/api/students/${student.id}`,
                    { method: "DELETE" }
                  );
                  fetchStudents();
                }}
              >
                Delete
              </button>
              {/* ✅ Dynamic SMS Button */}
              <button className="sms-btn" onClick={handleSendReport}>
                Send Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
