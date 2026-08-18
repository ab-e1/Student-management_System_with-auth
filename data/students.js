const students = [
  {
    id: 1,
    name: "first Student",
    email: "firstStudent@email.com",
    age: 21,
    course: "computer science",
    gpa: 3.7,
    status: "active",
  },
];

const nextId = () => {
  return students.length ? Math.max(students.map((s) => s.id)) + 1 : 1;
};

module.exports = { students, nextId };
