const API_URL = "http://localhost:3002/Employe";

// function to show the employe form
function showForm() {
    resetForm();
    $("#employeeForm").removeClass("d-none");
}

// function to save the employe data
function saveEmployee() {
    let employeeId = $("#employeeId").val();
    let employee = {
        name: $("#name").val(),
        age: $("#age").val(),
        address: $("#address").val(),
        mobile: $("#mobile").val()
    };

    // check if all fields are filled
    if (!employee.name || !employee.age || !employee.address || !employee.mobile) {
        alert("Please fill all fields");
        return;
    }

    // create new employe
    let url = employeeId ? `${API_URL}/${employeeId}` : API_URL;
    let method = employeeId ? "PUT" : "POST";

    $.ajax({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify(employee),
        success: function() {
            resetForm();
            loadEmployees();
        }
    });
}

// function to load all employee displaying in the table
function loadEmployees() {
    $.get(API_URL, function(employees) {
        let tableBody = $("#table-body");
        tableBody.empty();
        employees.forEach(employee => {
            tableBody.append(`
                <tr id="row-${employee.id}">
                    <td>${employee.name}</td>
                    <td>${employee.age}</td>
                    <td>${employee.address}</td>
                    <td>${employee.mobile}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="editEmployee('${employee.id}')"><ion-icon name="pencil"></ion-icon></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${employee.id}')"><ion-icon name="trash"></ion-icon></button>
                    </td>
                </tr>
            `);
        });
    });
}

// function to edit the employe data
function editEmployee(id) {
    $.get(`${API_URL}/${id}`, function(employee) {
        $("#name").val(employee.name);
        $("#age").val(employee.age);
        $("#address").val(employee.address);
        $("#mobile").val(employee.mobile);
        $("#employeeId").val(employee.id);
        $("#employeeForm").removeClass("d-none");
    });
}

// function to delete the employe data
function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    $.ajax({
        url: `${API_URL}/${id}`,
        method: "DELETE",
        success: function() {
            $(`#row-${id}`).remove();
        }
    });
}

// function to reset the form 
function resetForm() {
    $("#name, #age, #address, #mobile, #employeeId").val("");
    $("#employeeForm").addClass("d-none");
}