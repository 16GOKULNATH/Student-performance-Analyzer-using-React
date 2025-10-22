import React from "react";
import StudentCard from "./StudentCard";

const StudentList = ({ students, fetchStudents }) => (
  <div className="student-list">
    {students.map((student) => (
      <StudentCard key={student.id} student={student} fetchStudents={fetchStudents} />
    ))}
  </div>
);

export default StudentList;
