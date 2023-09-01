var courseApi = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);

    handleCreateForm();
}

start();

// Functions
function getCourses(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var courseItem = document.querySelector('.course-item-' + id);
            if (courseItem) {
                courseItem.remove();
            }
        });
}

function updateCourse(id, data) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

function handleEditCourse(id, name, description) {
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="description"]').value = description;
    var createBtn = document.querySelector('#create');
    createBtn.innerHTML = 'Save';
    createBtn.value = id;
}

function renderCourses(courses) {
    var listCourseBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function (course) {
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="handleEditCourse(${course.id}, '${course.name}', '${course.description}')">Sửa</button>
            </li>
        `;
    })
    listCourseBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description
        }

        if (createBtn.innerHTML === 'Save') {
            const id = createBtn.value;
            updateCourse(id, formData);
        }
        else {
            createCourse(formData, function () {
                getCourses(renderCourses);
            });
        }
    }
}