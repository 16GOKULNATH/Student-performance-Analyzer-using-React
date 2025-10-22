import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import ChartComponent from "./components/ChartComponent";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.regno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "average") {
      const avgA =
        Object.values(a.marks).reduce((x, y) => x + y, 0) /
        Object.values(a.marks).length;
      const avgB =
        Object.values(b.marks).reduce((x, y) => x + y, 0) /
        Object.values(b.marks).length;
      return avgB - avgA;
    }
    return 0;
  });

  return (
    <div>
      <Navbar />
      <div className="container">
        <section id="home">
          <h1>🎓 Student Performance Analyzer</h1>
        </section>

        <section id="add-student">
          <StudentForm fetchStudents={fetchStudents} />
        </section>

        <section id="student-list">
          <div className="search-sort">
            <input
              type="text"
              placeholder="Search by Name or Reg No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="average">Average Marks</option>
            </select>
          </div>

          <StudentList
            students={sortedStudents}
            fetchStudents={fetchStudents}
          />
        </section>

        <section id="chart">
          <ChartComponent students={sortedStudents} />
        </section>
      </div>
    </div>
  );
}

export default App;
