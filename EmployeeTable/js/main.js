/*global $,  document, window*/

var userInput = document.getElementById('userInput'),
    ageInput = document.getElementById('ageInput'),
    genderInput = document.getElementById('genderInput'),
    positionInput = document.getElementById('positionInput')
    salaryInput = document.getElementById('salaryInput'),
    submitBtn = document.getElementById('submitBtn'),
    searchInput = document.getElementById('searchInput'),
    searchRow = document.getElementById('searchRow')
var userArr;

var currentEmployee = 0 //Index Of Employee


if(localStorage.getItem("Employees") === null) {
    userArr = [];
} else {
    userArr = JSON.parse(localStorage.getItem("Employees"))
    myEmployee()
}

//Search Input
searchInput.onkeyup = function () {
    searchEmployees(searchInput.value)
}


//Start App By Click
submitBtn.onclick = () => {

    //Checking Add Or Update Employees
    if (submitBtn.innerHTML == 'Add Employee') {
        getUser()      
        myEmployee()  

    } else {
        updateEmployee();      
        myEmployee()  
        localStorage.setItem("Employees", JSON.stringify(userArr))
        clearData()
    }

}

//Updating Function of Employee
function updateEmployee() {
    userArr[currentEmployee].name = userInput.value
    userArr[currentEmployee].age = ageInput.value
    userArr[currentEmployee].gender = genderInput.value
    userArr[currentEmployee].position = positionInput.value
    userArr[currentEmployee].salary  = salaryInput.value

    submitBtn.innerHTML = 'Add Employee'
}

//Searching Function
function searchEmployees(employee) {
    var searchCols =''
    for(var i= 0; i< userArr.length; i++) {
        
        if(userArr[i].user.includes(employee)) {
            console.log(userArr[i])
            searchCols += `
            <ul class="list-unstyled main-list">
                <li><span class="font-weight-bold">Employees: </span> ${userArr[i].user}</li>
                <li><span class="font-weight-bold">Age: </span>${userArr[i].age}</li>
                <li><span class="font-weight-bold">Gender: </span>${userArr[i].gender}</li>
                <li><span class="font-weight-bold">Gender: </span>${userArr[i].position}</li>
                <li><span class="font-weight-bold">Salary: </span>${userArr[i].salary}</li>
            </ul>
        `
        }
    }
    searchRow.innerHTML = searchCols
    

    
}

//Get User's Value
function getUser() {
    
    var employee = {
        user: userInput.value,
        age: ageInput.value,
        gender: genderInput.value,
        position: positionInput.value,
        salary: salaryInput.value
    }

    if(userInput.value == '' || ageInput.value == '' || genderInput.value == '' || positionInput == '' || salaryInput.value == '') {
        alert("Please Fill Your Form")
    } else {
        userArr.push(employee);
        clearData()  // ClearDatafunction Run When You Fill Your Form 
    }

    //Local Storage
    localStorage.setItem("Employees", JSON.stringify(userArr))
    
}

//Looping Data
function myEmployee() {
    var tableBody = document.getElementById('tableBody')
    var txt='';
    for(x = 0; x < userArr.length; x++) {
        txt += `
            <tr>
                <td>${userArr[x].user}</td>
                <td>${userArr[x].age}</td>
                <td>${userArr[x].gender}</td>
                <td>${userArr[x].position}</td>
                <td>${userArr[x].salary}</td>
                <td>
                    <button onclick="setForm(${x})" class="btn btn-info">Update</button> 
                </td>
                <td>
                    <button onclick="deleteData(${x})" class="btn btn-danger">Delete</button> 
                </td>      
            </tr>
        `
    }
    tableBody.innerHTML = txt
}

//Update Data 
function setForm (x) {
    userInput.value = userArr[x].user
    ageInput.value = userArr[x].age
    genderInput.value = userArr[x].gender
    positionInput.value = userArr[x].position
    salaryInput.value = userArr[x].salary

    submitBtn.innerHTML = 'Update Employee'

    currentEmployee = x;
}


//ClearData
function clearData () {
    var inputs = document.getElementsByClassName('clear');
    for(var i=0; i<inputs.length; i++) {
        inputs[i].value = '';
    }
}


//DeleteData 
function deleteData (deleted) {
    userArr.splice(deleted,1)
    //Local Storage
    localStorage.setItem("Employees", JSON.stringify(userArr))
    myEmployee() 
}


