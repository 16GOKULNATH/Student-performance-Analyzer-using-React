import fs from "fs-extra";
const filePath = "./data/students.json";

// Get all students
export const getStudents = async (req, res) => {
  const students = await fs.readJson(filePath);
  res.json(students);
};

// Add student
export const addStudent = async (req, res) => {
  const students = await fs.readJson(filePath);
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  await fs.writeJson(filePath, students, { spaces: 2 });
  res.json(newStudent);
};

// Update student
export const updateStudent = async (req, res) => {
  const students = await fs.readJson(filePath);
  const index = students.findIndex((s) => s.id == req.params.id);
  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    await fs.writeJson(filePath, students, { spaces: 2 });
    res.json(students[index]);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  const students = await fs.readJson(filePath);
  const updated = students.filter((s) => s.id != req.params.id);
  await fs.writeJson(filePath, updated, { spaces: 2 });
  res.json({ message: "Deleted successfully" });
};
