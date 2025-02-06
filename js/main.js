// Элементы для работы с модальным окном и таблицей
const elModalWrapper = document.querySelector(".modal-wrapper");
const elModal = document.querySelector(".modal");

const studentTableBody = document.getElementById('studentTableBody');
let students = JSON.parse(localStorage.getItem('students')) || [];

// Функция для отображения таблицы
function renderTable() {
    studentTableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${student.image || './images/person.svg'}" alt="Student Image" width="50" height="50" style="border-radius:15px;"></td>
            <td><a href="#" onclick="viewStudentDetails(${index})">${student.name}</a></td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.enroll}</td>
            <td>${student.date}</td>
            <td class="fun action-buttons">
                <button onclick="editStudent(${index})">
                    <img src="./images/edit.svg" alt="">
                </button>
                <button onclick="deleteStudent(${index})">
                    <img src="./images/delete.svg" alt="">
                </button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Функция для просмотра деталей студента
function viewStudentDetails(index) {
    localStorage.setItem('single', JSON.stringify([students[index]]));
    window.open("singleperson.html");
}

// Функция для обработки отправки формы
function handleFormSubmit(event, index) {
    event.preventDefault();

    const form = event.target;
    const name = form.person.value;
    const email = form.userEmail.value;
    const phone = form.userNumber.value;
    const enroll = form.userID.value;
    const date = form.registerDate.value;
    
    // Извлекаем сохраненное изображение (Base64) из data-атрибута
    const imageElement = document.querySelector('.added-img');
    const image = imageElement.dataset.file || imageElement.src || './images/person.svg';

    const studentData = { name, email, phone, enroll, date, image };

    if (index !== null) {
        students[index] = studentData;
    } else {
        students.push(studentData);
    }

    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    closeModal();
}

// Функция для предварительного просмотра изображения
function previewImage(event) {
    const imageElement = document.querySelector('.added-img');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageElement.src = e.target.result;
            imageElement.dataset.file = e.target.result; // Сохраняем в Base64
        };
        reader.readAsDataURL(file);
    }
}

// Открытие модального окна
function openModal(student = null, index = null) {
    elModalWrapper.classList.remove("hidden");
    setTimeout(() => {
        elModal.classList.remove("scale-0");
    }, 50);

    elModal.innerHTML = `
        <div class="flex flex-col items-center justify-center">
            <form class="add-person-form flex flex-col items-center justify-center gap-[20px]">
                <label class="flex flex-col items-center">
                    <img class="added-img" src="${student?.image || './images/person.svg'}" alt="Student Image" width="100" height="100" style="border-radius: 50%;">
                    <span>Student photo</span>
                    <input class="newImgInput hidden" type="file" name="userImg" onchange="previewImage(event)">
                </label>
                <input required class="input-field p-3" placeholder="Enter user name" type="text" name="person" value="${student?.name || ''}">
                <input required class="input-field p-3" placeholder="Enter user email" type="email" name="userEmail" value="${student?.email || ''}">
                <input required class="input-field p-3" placeholder="Enter user number" type="tel" name="userNumber" value="${student?.phone || ''}">
                <input required class="input-field p-3" placeholder="Enter user enroll number" type="text" name="userID" value="${student?.enroll || ''}">
                <input required class="input-field p-3" type="date" name="registerDate" value="${student?.date || ''}">
                <button type="submit">${index !== null ? 'Save' : 'Add'}</button>
            </form>
        </div>
    `;

    const form = elModal.querySelector('.add-person-form');
    form.onsubmit = (event) => handleFormSubmit(event, index);
}

// Удаление студента
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
}

// Редактирование студента
function editStudent(index) {
    const student = students[index];
    openModal(student, index);
}

// Закрытие модального окна
function closeModal() {
    elModal.classList.add("scale-0");
    setTimeout(() => {
        elModalWrapper.classList.add("hidden");
    }, 200);
}

// Обработчик для кнопки "Add New Student"
function handleAddClick() {
    openModal();
}

elModalWrapper.addEventListener("click", function (ev) {
    if (ev.target.id == "wrapper") {
        closeModal();
    }
});

// Первоначальный рендер
renderTable();
