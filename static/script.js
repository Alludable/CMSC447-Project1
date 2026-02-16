document.addEventListener("DOMContentLoaded", () => {
  const loadBtn = document.getElementById("fetchStudents");

  loadBtn.addEventListener("click", async () => {
    try {
      await fetchStudents();
      updateActionButtons();

      const rowCount = document.querySelectorAll("#students-table-body tr").length;
    } catch (err) {
      console.error("Failed to load students:", err);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loadBtn = document.getElementById("fetchInstructors");

  loadBtn.addEventListener("click", async () => {
    try {
      await fetchInstructors();
      updateActionButtons();

      const rowCount = document.querySelectorAll("#students-table-body tr").length;
    } catch (err) {
      console.error("Failed to load instructors:", err);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loadBtn = document.getElementById("fetchCourses");

  loadBtn.addEventListener("click", async () => {
    try {
      await fetchCourses();
      updateActionButtons();

      const rowCount = document.querySelectorAll("#courses-table-body tr").length;
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loadBtn = document.getElementById("fetchEnrollments");

  loadBtn.addEventListener("click", async () => {
    try {
      await fetchEnrollments();
      updateActionButtons();

      const rowCount = document.querySelectorAll("#enrollments-table-body tr").length;
    } catch (err) {
      console.error("Failed to load enrollments:", err);
    }
  });
});

document.getElementById("deleteBtnStudent").addEventListener("click", async () => {
    document.getElementById("deleteModalStudent").hidden = false;
})

document.getElementById("deleteBtnInstructor").addEventListener("click", async () => {
    document.getElementById("deleteModalInstructor").hidden = false;
})

document.getElementById("deleteBtnCourse").addEventListener("click", async () => {
    document.getElementById("deleteModalCourse").hidden = false;
})

document.getElementById("deleteBtnEnrollment").addEventListener("click", async () => {
    document.getElementById("deleteModalEnrollment").hidden = false;
})

document.getElementById("addBtnEnrollment").addEventListener("click", async () => {
    document.getElementById("addModalEnrollment").hidden = false;
})

document.getElementById("addBtnStudent").addEventListener("click", async () => {
    document.getElementById("addModalStudent").hidden = false;
})

document.getElementById("addBtnInstructor").addEventListener("click", async () => {
    document.getElementById("addModalInstructor").hidden = false;
})

document.getElementById("addBtnCourse").addEventListener("click", async () => {
    document.getElementById("addModalCourse").hidden = false;
})

document.getElementById("updateBtnEnrollment").addEventListener("click", async () => {
    document.getElementById("updateModalEnrollment").hidden = false;
})

document.getElementById("updateBtnStudent").addEventListener("click", async () => {
    document.getElementById("updateModalStudent").hidden = false;
})

document.getElementById("updateBtnInstructor").addEventListener("click", async () => {
    document.getElementById("updateModalInstructor").hidden = false;
})

document.getElementById("updateBtnCourse").addEventListener("click", async () => {
    document.getElementById("updateModalCourse").hidden = false;
})

document.getElementById("updateBtnEnrollment").addEventListener("click", async () => {
    document.getElementById("updateModalEnrollment").hidden = false;
})

document.getElementById("cancelAddBtnStudent").addEventListener("click", async () => {
    document.getElementById("addModalStudent").hidden = true;
})

document.getElementById("cancelAddBtnInstructor").addEventListener("click", async () => {
    document.getElementById("addModalInstructor").hidden = true;
})

document.getElementById("cancelAddBtnCourse").addEventListener("click", async () => {
    document.getElementById("addModalCourse").hidden = true;
})

document.getElementById("cancelAddBtnEnrollment").addEventListener("click", async () => {
    document.getElementById("addModalEnrollment").hidden = true;
})

document.getElementById("cancelDeleteBtnStudent").addEventListener("click", async () => {
    document.getElementById("deleteModalStudent").hidden = true;
})

document.getElementById("cancelDeleteBtnInstructor").addEventListener("click", async () => {
    document.getElementById("deleteModalInstructor").hidden = true;
})

document.getElementById("cancelDeleteBtnCourse").addEventListener("click", async () => {
    document.getElementById("deleteModalCourse").hidden = true;
})

document.getElementById("cancelDeleteBtnEnrollment").addEventListener("click", async () => {
    document.getElementById("deleteModalEnrollment").hidden = true;
})

document.getElementById("cancelUpdateBtnStudent").addEventListener("click", async () => {
    document.getElementById("updateModalStudent").hidden = true;
})

document.getElementById("cancelUpdateBtnInstructor").addEventListener("click", async () => {
    document.getElementById("updateModalInstructor").hidden = true;
})

document.getElementById("cancelUpdateBtnCourse").addEventListener("click", async () => {
    document.getElementById("updateModalCourse").hidden = true;
})

document.getElementById("cancelUpdateBtnEnrollment").addEventListener("click", async () => {
    document.getElementById("updateModalEnrollment").hidden = true;
})

document.getElementById("confirmDeleteBtnStudent").addEventListener("click", async () => {
    const enteredId = document.getElementById("deleteIdInputStudent").value;
    if (!enteredId) {
        alert("Please enter a Student ID.");
    }

    await deleteStudent(enteredId);
    document.getElementById("deleteModal").hidden = true;
})

document.getElementById("confirmDeleteBtnInstructor").addEventListener("click", async () => {
    const enteredId = document.getElementById("deleteIdInputInstructor").value;
    if (!enteredId) {
        alert("Please enter an Instructor ID.");
    }

    await deleteInstructor(enteredId);
    document.getElementById("deleteModalInstructor").hidden = true;
})

document.getElementById("confirmDeleteBtnCourse").addEventListener("click", async () => {
    const enteredId = document.getElementById("deleteIdInputCourse").value;
    if (!enteredId) {
        alert("Please enter a Course ID.");
    }

    await deleteCourse(enteredId);
    document.getElementById("deleteModalCourse").hidden = true;
})

document.getElementById("confirmDeleteBtnEnrollment").addEventListener("click", async () => {
    const studentIdInput = document.getElementById("deleteStudentIdInputEnrollment").value;
    const courseIdInput = document.getElementById("deleteCourseIdInputEnrollment").value;

    if (!studentIdInput || !courseIdInput) {
        alert("Please enter both Student ID and Course ID.");
        return;
    }

    await deleteEnrollment(studentIdInput, courseIdInput);
    document.getElementById("deleteModalEnrollment").hidden = true;
})

document.getElementById("confirmAddBtnStudent").addEventListener("click", async () => {
    const nameInput = document.getElementById("addNameInputStudent").value;
    const creditsInput = document.getElementById("addCreditsInputStudent").value;

    if (!nameInput || !creditsInput) {
        alert("Please enter both name and credits.");
        return;
    }

    if (isNaN(creditsInput)) {
        alert("Credits must be a number.");
        return;
    }
    try {
        await addStudent(nameInput, creditsInput);
    } catch (err) {
        console.error("Failed to add student:", err);
    }
    document.getElementById("addModalStudent").hidden = true;
})

document.getElementById("confirmAddBtnInstructor").addEventListener("click", async () => {
    const nameInput = document.getElementById("addNameInputInstructor").value;
    const departmentInput = document.getElementById("addDepartmentInputInstructor").value;

    if (!nameInput || !departmentInput) {
        alert("Please enter both name and department.");
        return;

    }try {

        await addInstructor(nameInput, departmentInput);

    } catch (err) {
        console.error("Failed to add instructor:", err);
    }
    document.getElementById("addModalInstructor").hidden = true;
})

document.getElementById("confirmAddBtnCourse").addEventListener("click", async () => {
    const nameInput = document.getElementById("addNameInputCourse").value;
    const instrIdInput = document.getElementById("addInstructorIdInputCourse").value;
    const creditsInput = document.getElementById("addCreditsInputCourse").value;

    if (!nameInput || !creditsInput || !instrIdInput) {
        alert("Please enter the course name, credits, and instructor ID.");
        return;

    }try {

        await addCourse(nameInput, instrIdInput, creditsInput);

    } catch (err) {
        console.error("Failed to add course:", err);
    }
    document.getElementById("addModalCourse").hidden = true;
})

document.getElementById("confirmAddBtnEnrollment").addEventListener("click", async () => {
    const studentIdInput = document.getElementById("addStudentIdInputEnrollment").value;
    const courseIdInput = document.getElementById("addCourseIdInputEnrollment").value;
    const gradeInput = document.getElementById("addGradeInputEnrollment").value;

    if (!studentIdInput || !courseIdInput) {
        alert("Please enter both Student ID and Course ID.");
        return;

    }try {

        await addEnrollment(studentIdInput, courseIdInput, gradeInput);

    } catch (err) {
        console.error("Failed to add enrollment:", err);
    }
    document.getElementById("addModalEnrollment").hidden = true;
})

document.getElementById("confirmUpdateBtnStudent").addEventListener("click", async () => {
    const idInput = document.getElementById("updateRowStudent").value;
    const nameInput = document.getElementById("updateNameInputStudent").value;
    const creditsInput = document.getElementById("updateCreditsInputStudent").value;

    if (!idInput) {
        alert("Please enter a Student ID.");
        return;
    }

    if (creditsInput && isNaN(creditsInput)) {
        alert("Credits must be a number.");
        return;
    }

    const updates = {};


    if (creditsInput !== "") updates.credits = parseInt(creditsInput, 10);
    if (nameInput) updates.name = nameInput;

    if (Object.keys(updates).length === 0) {
        alert("Please enter at least one field to update.");
        return;
    }
    try {
        await updateStudent(idInput, updates);
    } catch (err) {
        console.error("Failed to update student:", err);
    }
    document.getElementById("updateModalStudent").hidden = true;
})

document.getElementById("confirmUpdateBtnInstructor").addEventListener("click", async () => {
    const idInput = document.getElementById("updateRowInstructor").value;
    const nameInput = document.getElementById("updateNameInputInstructor").value;
    const departmentInput = document.getElementById("updateDepartmentInputInstructor").value;

    if (!idInput) {
        alert("Please enter a Student ID.");
        return;
    }

    const updates = {};

    if (nameInput) updates.name = nameInput;
    if (departmentInput) updates.department = departmentInput;

    if (Object.keys(updates).length === 0) {
        alert("Please enter at least one field to update.");
        return;
    }
    try {
        await updateInstructor(idInput, updates);
    } catch (err) {
        console.error("Failed to update instructor:", err);
    }
    document.getElementById("updateModalInstructor").hidden = true;
})

document.getElementById("confirmUpdateBtnCourse").addEventListener("click", async () => {
    const idInput = document.getElementById("updateRowCourse").value;
    const titleInput = document.getElementById("updateNameInputCourse").value;
    const instrIdInput = document.getElementById("updateInstructorIdInputCourse").value;
    const creditsInput = document.getElementById("updateCreditsInputCourse").value;
    if (!idInput) {
        alert("Please enter a Course ID.");
        return;
    }

    const updates = {};

    if (titleInput) updates.title = titleInput;
    if (instrIdInput !== "") updates.inst_id = parseInt(instrIdInput, 10);
    if (creditsInput !== "") updates.credits = parseInt(creditsInput, 10);

    

    if (Object.keys(updates).length === 0) {
        alert("Please enter at least one field to update.");
        return;
    }
    try {
        await updateCourse(idInput, updates);
    } catch (err) {
        console.error("Failed to update course:", err);
    }
    document.getElementById("updateModalCourse").hidden = true;
})

document.getElementById("confirmUpdateBtnEnrollment").addEventListener("click", async () => {
    const studentIdInput = document.getElementById("updateStudentIdInputEnrollment").value;
    const courseIdInput = document.getElementById("updateCourseIdInputEnrollment").value;
    const gradeInput = document.getElementById("updateGradeInputEnrollment").value;
    if (!studentIdInput || !courseIdInput) {
        alert("Please enter both Student ID and Course ID.");
        return;
    }

    const updates = {};

    if (gradeInput) updates.grade = gradeInput;
    if (studentIdInput !== "") updates.student_id = parseInt(studentIdInput, 10);
    if (courseIdInput !== "") updates.course_id = parseInt(courseIdInput, 10);

    

    if (Object.keys(updates).length === 0) {
        alert("Please enter at least one field to update.");
        return;
    }
    try {
        await updateEnrollment(studentIdInput, courseIdInput, updates);
    } catch (err) {
        console.error("Failed to update enrollment:", err);
    }
    document.getElementById("updateModalEnrollment").hidden = true;
})

function updateActionButtons() {
    const studentRowCount = document.querySelectorAll("#students-table-body tr").length;
    document.getElementById("updateBtnStudent").disabled = (studentRowCount === 0);
    document.getElementById("deleteBtnStudent").disabled = (studentRowCount === 0);

    const instructorRowCount = document.querySelectorAll("#instructors-table-body tr").length;
    document.getElementById("updateBtnInstructor").disabled = (instructorRowCount === 0);
    document.getElementById("deleteBtnInstructor").disabled = (instructorRowCount === 0);

    const courseRowCount = document.querySelectorAll("#courses-table-body tr").length;
    document.getElementById("updateBtnCourse").disabled = (courseRowCount === 0);
    document.getElementById("deleteBtnCourse").disabled = (courseRowCount === 0);

    const enrollmentRowCount = document.querySelectorAll("#enrollments-table-body tr").length;
    document.getElementById("updateBtnEnrollment").disabled = (enrollmentRowCount === 0);
    document.getElementById("deleteBtnEnrollment").disabled = (enrollmentRowCount === 0);
}

async function fetchStudents() {
    const response = await fetch('/get-students');
    const data = await response.json();

    const studentsList = data.students;
    if (!studentsList || studentsList.length === 0) {
        alert("No students found in the database.");
        return;
    }

    const tableBody = document.getElementById('students-table-body');
    tableBody.innerHTML = '';

    studentsList.forEach(student => {
        const row = document.createElement('tr')
        row.dataset.studentId = student.ID;
        row.innerHTML = `
            <td>${student.ID}</td>
            <td>${student.name}</td>
            <td>${student.credits}</td>
        `;
        tableBody.appendChild(row);
    })
    updateActionButtons();
}

async function fetchInstructors() {
    const response = await fetch('/get-instructors');
    const data = await response.json();

    const instructorsList = data.instructors;

    if (!instructorsList || instructorsList.length === 0) {
        alert("No instructors found in the database.");
        return;
    }

    const tableBody = document.getElementById('instructors-table-body');
    tableBody.innerHTML = '';
    
    instructorsList.forEach(instructor => {
        const row = document.createElement('tr')
        row.dataset.instructorId = instructor.ID;
        row.innerHTML = `
            <td>${instructor.ID}</td>
            <td>${instructor.name}</td>
            <td>${instructor.department}</td>
        `;
        tableBody.appendChild(row);
    })
    updateActionButtons();
}

async function fetchCourses() {
    const response = await fetch('/get-courses');
    const data = await response.json();

    const coursesList = data.courses || [];
    const tableBody = document.getElementById('courses-table-body');

    tableBody.innerHTML = '';

    if (!coursesList || coursesList.length === 0) {
        updateActionButtons();
        return;
    }
    
    coursesList.forEach(course => {
        const row = document.createElement('tr')
        row.dataset.courseId = course.ID;
        row.innerHTML = `
            <td>${course.ID}</td>
            <td>${course.title}</td>
            <td>${course.inst_id}</td>
            <td>${course.credits}</td>
        `;
        tableBody.appendChild(row);
    })
    updateActionButtons();
}

async function fetchEnrollments() {
    const response = await fetch('/get-enrollments');
    const data = await response.json();

    const enrollmentsList = data.enrollments || [];
    const tableBody = document.getElementById('enrollments-table-body');

    tableBody.innerHTML = '';

    if (!enrollmentsList || enrollmentsList.length === 0) {
        updateActionButtons();
        return;
    }
    
    enrollmentsList.forEach(enrollment => {
        const row = document.createElement('tr')
        row.dataset.studentId = enrollment.student_id;
        row.dataset.courseId = enrollment.course_id;
        row.innerHTML = `
            <td>${enrollment.student_id}</td>
            <td>${enrollment.student_name}</td>
            <td>${enrollment.course_id}</td>
            <td>${enrollment.course_title}</td>
            <td>${enrollment.grade}</td>
        `;
        tableBody.appendChild(row);
    })
    updateActionButtons();
}

async function deleteStudent(studentId) {
    const res = await fetch(`/delete-student/${studentId}`, {method: 'DELETE'});

    if (res.status === 404) {
        alert("That Student ID does not exist.");
    }

    if (!res.ok) {
        alert("Failed to delete student. Please try again.");
    }

    const row = document.querySelector(
        `#students-table-body tr[data-student-id="${studentId}"]`
    );

    if (row) row.remove();
    updateActionButtons();
}

async function deleteInstructor(instructorId) {
    const res = await fetch(`/delete-instructor/${instructorId}`, {method: 'DELETE'});

    if (res.status === 404) {
        alert("That Instructor ID does not exist.");
    }

    if (!res.ok) {
        alert("Failed to delete instructor. Please try again.");
    }

    const row = document.querySelector(
        `#instructors-table-body tr[data-instructor-id="${instructorId}"]`
    );

    if (row) row.remove();
    updateActionButtons();
    fetchCourses();
}

async function deleteCourse(courseId) {
    const res = await fetch(`/delete-course/${courseId}`, {method: 'DELETE'});

    if (res.status === 404) {
        alert("That Course ID does not exist.");
    }

    if (!res.ok) {
        alert("Failed to delete course. Please try again.");
    }

    const row = document.querySelector(
        `#courses-table-body tr[data-course-id="${courseId}"]`
    );

    if (row) row.remove();
    updateActionButtons();
}

async function deleteEnrollment(studentId, courseId) {
    const res = await fetch(`/delete-enrollment/${studentId}/${courseId}`, {method: 'DELETE'});

    if (res.status === 404) {
        alert("That enrollment does not exist.");
    }

    if (!res.ok) {
        alert("Failed to delete enrollment. Please try again.");
    }

    const row = document.querySelector(
        `#enrollments-table-body tr[data-student-id="${studentId}"][data-course-id="${courseId}"]`
    );

    if (row) row.remove();
    updateActionButtons();
}

async function addStudent(name, credits) {
    const res = await fetch("/add-student", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {name, credits} )
    });

    await fetchStudents();
}

async function addInstructor(name, department) {
    const res = await fetch("/add-instructor", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {name, department} )
    });

    await fetchInstructors();
}

async function addCourse(title, inst_id, credits) {
    const res = await fetch("/add-course", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {title, inst_id, credits} )
    });

    await fetchCourses();

}

async function addEnrollment(student_id, course_id, grade) {
    const res = await fetch("/add-enrollment", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {student_id, course_id, grade} )
    });

    await fetchEnrollments();
}

async function updateStudent(id, updates) {
    const res = await fetch(`/update-student/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updates)
    });

    if (res.status === 404) {
        alert("That Student ID does not exist.");
    }

    if (!res.ok) {
        alert("Failed to update student. Please try again.");
    }

    await fetchStudents();
    await fetchEnrollments();
}

async function updateInstructor(id, updates) {
    const res = await fetch(`/update-instructor/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updates)
    });

    if (res.status === 404) {
        alert("That Instructor ID does not exist.");
    }

    if (!res.ok) {
        alert("Failed to update instructor. Please try again.");
    }

    await fetchInstructors();
    await fetchCourses();
}

async function updateCourse(id, updates) {
    const res = await fetch(`/update-course/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updates)
    });

    if (res.status === 404) {
        alert("That Course ID does not exist.");
    }

    if (!res.ok) {
        alert("Failed to update course. Please try again.");
    }

    await fetchCourses();
    await fetchEnrollments();
}

async function updateEnrollment(student_id, course_id, updates) {
    const res = await fetch(`/update-enrollment/${student_id}/${course_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updates)
    });

    if (res.status === 404) {
        alert("That enrollment does not exist.");
    }

    if (!res.ok) {
        alert("Failed to update enrollment. Please try again.");
    }

    await fetchEnrollments();
}