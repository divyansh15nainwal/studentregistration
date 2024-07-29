document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const studentTableBody = document.querySelector('#studentTable tbody');

    
    let students = JSON.parse(localStorage.getItem('students')) || [];
    displayStudents();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const studentName = document.getElementById('studentName').value.trim();
        const studentID = document.getElementById('studentID').value.trim();
        const emailID = document.getElementById('emailID').value.trim();
        const contactNo = document.getElementById('contactNo').value.trim();

        if (!studentName || !studentID || !emailID || !contactNo) {
            alert('All fields are required.');
            return;
        }

        const student = {
            id: Date.now(),
            name: studentName,
            studentID: studentID,
            emailID: emailID,
            contactNo: contactNo
        };

        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        form.reset();
        displayStudents();
    });

    function displayStudents() {
        studentTableBody.innerHTML = '';

        students.forEach((student) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentID}</td>
                <td>${student.emailID}</td>
                <td>${student.contactNo}</td>
                <td class="actions">
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    }

    window.editStudent = function(id) {
        const student = students.find(student => student.id === id);

        if (student) {
            document.getElementById('studentName').value = student.name;
            document.getElementById('studentID').value = student.studentID;
            document.getElementById('emailID').value = student.emailID;
            document.getElementById('contactNo').value = student.contactNo;

            students = students.filter(student => student.id !== id);
            localStorage.setItem('students', JSON.stringify(students));
            displayStudents();
        }
    };

    window.deleteStudent = function(id) {
        students = students.filter(student => student.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };
});

