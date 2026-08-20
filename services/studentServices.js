const { students, nextId } = require("../data/students.js");

//create a student

const createStudent = (data) => {
  const duplicate = students.find(
    (s) => s.email.toLowerCase().trim() === data.email.toLowerCase().trim(),
  );

  if (duplicate) {
    return {
      ok: false,
      error: "student already registered with that email",
    };
  }
  const student = {
    id: nextId(),
    name: data.name,
    email: data.email.toLowerCase().trim(),
    age: data.age,
    course: data.course,
    gpa: data.gpa,
    status: data.status,
  };

  students.push(student);
  return {
    ok: true,
    data: student,
  };
};

// update Student

const updateStudent = (id, ...data) => {
  const index = students.findIndex((s) => s.id === Number(id));
  if (index === -1) {
    return {
      ok: false,
      error: "student not found wiht given id",
    };
  }
  const student = (students[index] = { ...students[index], ...data });

  return {
    ok: true,
    data: student,
  };
};

// delete Student

const deleteStudent = (id) => {
  const index = students.findIndex((s) => s.id === Number(id));
  if (index === -1) {
    return {
      ok: false,
      error: "student not found with given id",
    };
  }
  const [deleted] = students.splice(index, 1);
  return {
    ok: true,
    data: deleted,
  };
};

// get student by Id

const getStudentById = (id) => {
  const student = students.find((s) => s.id === Number(id));
  if (!student) {
    return {
      ok: false,
      error: "student not found with the given id",
    };
  }
  return {
    ok: true,
    data: student,
  };
};

// getAllStudent

const getAllStudent = (query) => {
  let result = [...students];
  if (query.search) {
    const keyWord = query.search.toLowerCase().trim();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().trim().includes(keyWord) ||
        s.email.toLowerCase().trim.includes(keyWord),
    );
  }
  if (query.status) {
    result = result.filter(
      (s) =>
        s.status.toLowerCase().trim() === query.status.toLowerCase().trim(),
    );
  }

  if (query.course) {
    result = result.filter(
      (s) =>
        s.course.toLowerCase().trim() === query.course.toLowerCase().trim(),
    );
  }
  if (query.minGpa) {
    result = result.filter((s) => s.gpa >= Number(query.minGpa));
  }
  if (query.maxGpa) {
    result = result.filter((s) => s.gpa <= Number(query.maxGpa));
  }
  return {
    ok: true,
    data: result,
  };
};


// getStatistics

const getStats = () => {
  const totalStudents = students.length;
  const totalGpa = students.reduce((sum, s) => sum + s.gpa, 0);
  const averageGpa =
    totalStudents > 0 ? Math.round((totalGpa / totalStudents) * 100) / 100 : 0;
  const studentsByCourse = students.reduce((acc, s) => {
    acc[s.course] = (acc[s.course] || 0) + 1;
    return acc;
  }, {});

  return {
    ok: true,
    data: {
      totalStudents: totalStudents,
      averageGpa: averageGpa,
      studentsByCourse: studentsByCourse,
    },
  };
};
module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getAllStudent,
  getStats,
};
