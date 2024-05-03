function time_now(){
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const d = new Date();
	const month = months[d.getMonth()];
	var ampm;
	if(d.getHours()>=12){
		ampm = "PM";
	} else{
		ampm = "AM";
	}

	document.getElementById("date").innerHTML = "Today is " + month + " " + d.getDate() + ", " + d.getFullYear() + ", " + days[d.getDay()] + 
	"<br> The current time is " + d.getHours() + ":" + d.getMinutes() + " " + ampm;
}

let students = [];

function generateID(){
	let min = 100000;
	let max = 999999;
	let ID;
	ID = Math.floor(Math.random() * (max - min + 1)) + min;
	return ID;
}

function add_student(){
	// Assign user input to variables
	const name = document.getElementById("name").value;
	const age = parseInt(document.getElementById("age").value);
	const email = document.getElementById("email").value;
	const course = document.querySelector('input[name="course"]:checked');
	
	// Check if user input is complete or valid
	if (!name || !email || !course){
		document.getElementById("formResult").innerHTML = "Please enter all details.";
	} else if(isNaN(age) || age <= 0){
		document.getElementById("formResult").innerHTML = "Please enter a valid age.";
	} else{
		const courseName = course.value;
		// Creates a student object
		const student = {
		studentID: generateID(),
		name: name,
		age: age,
		email: email,
		course: courseName,
		};

		students.push(student);
		document.getElementById("formResult").innerHTML = "Student added successfully!";
		document.getElementById("studentForm").reset();
	}	
}

function display_list(){
	const listStudentDiv = document.getElementById("listStudents");
	listStudentDiv.innerHTML = "";

	// Displays each student in a div 
	students.forEach(function(student){
		const studentInfo = `
			<div class="student">
				<p>Student ID: ${student.studentID}</p>
				<p>Name: ${student.name}</p>
				<p>Age: ${student.age}</p>
				<p>Email: ${student.email} </p>
				<p>Course: ${student.course}</p>
			</div>	
		`;
		listStudentDiv.innerHTML += studentInfo;
	});
}

function find_student(){
	const searchID = parseInt(document.getElementById("searchStudentID").value);
	document.getElementById("searchResult").innerHTML = "";

    let studentFound = false;

	// Searches the student from the array of students
    students.forEach(function(student) {
        if (student.studentID == searchID) {
            studentFound = true;

			document.getElementById("searchResult").innerHTML = "Student ID: " + student.studentID + "<br>Name: " + student.name
			+ "<br>Age: " + student.age + "<br>Email: " + student.email + "<br>Course: " + student.course;
        }
    });

	if(!studentFound){
		document.getElementById("searchResult").innerHTML = "The Student ID cannot be found";
	}
}
	
