import React, { useState } from "react";

const StudentForm = ({ fetchStudents }) => {
  const [form, setForm] = useState({
    name: "",
    regno: "",
    maths: "",
    science: "",
    english: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = {
      name: form.name,
      regno: form.regno,
      marks: {
        Maths: Number(form.maths),
        Science: Number(form.science),
        English: Number(form.english),
      },
    };
    await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });
    fetchStudents();
    setForm({ name: "", regno: "", maths: "", science: "", english: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="regno" placeholder="Reg No" value={form.regno} onChange={handleChange} required />
      <input name="maths" placeholder="Maths" value={form.maths} onChange={handleChange} required />
      <input name="science" placeholder="Science" value={form.science} onChange={handleChange} required />
      <input name="english" placeholder="English" value={form.english} onChange={handleChange} required />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
