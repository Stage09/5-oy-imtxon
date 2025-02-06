// Элементы для работы с модальным окном и таблицей
const studentTableBody = document.getElementById('studentTableBody');
const elModalWrapper = document.querySelector(".modal-wrapper");
const elModal = document.querySelector(".modal");

let students = JSON.parse(localStorage.getItem('students')) || [];

// Функция для отображения таблицы
function renderTable() {
    studentTableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${student.image || './images/person.svg'}" alt="Student Image" width="50" height="50" style="border-radius: 50%;"></td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.enroll}</td>
            <td>${student.date}</td>
            <td class="action-buttons gap-5">
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

// Открытие модального окна для добавления или редактирования
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
                    <span>Choose your image</span>
                    <input class="newImgInput hidden" type="file" name="userImg" onchange="previewImage(event)">
                </label>
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user name" type="text" name="person" value="${student?.name || ''}">
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user email" type="email" name="userEmail" value="${student?.email || ''}">
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user number" type="tel" name="userNumber" value="${student?.phone || ''}">
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user enroll number" type="text" name="userID" value="${student?.enroll || ''}">
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="" type="date" name="registerDate" value="${student?.date || ''}">
                <button type="submit">${index !== null ? 'Save' : 'Add'}</button>
            </form>
        </div>
    `;

    const form = elModal.querySelector('.add-person-form');
    form.onsubmit = (event) => handleFormSubmit(event, index);
}

// Функция для предварительного просмотра изображения
function previewImage(event) {
    const imageElement = document.querySelector('.added-img');
    const file = event.target.files[0];
    if (file) {
        // Создаем URL для файла и сохраняем его в data-атрибут
        imageElement.src = URL.createObjectURL(file);
        imageElement.dataset.file = URL.createObjectURL(file);
    }
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
    
    // Извлекаем сохраненный URL изображения из data-атрибута
    const imageUrl = document.querySelector('.added-img').dataset.file;

    // Если изображение не было выбрано, используем изображение по умолчанию
    const image = imageUrl || './images/person.svg';

    const studentData = { name, email, phone, enroll, date, image };

    if (index !== null) {
        students[index] = studentData;
    } else {
        students.push(studentData);
    }

    // Сохраняем данные в localStorage
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    closeModal();
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
    openModal();  // Открытие модального окна для добавления нового студента
}

elModalWrapper.addEventListener("click", function (ev) {
    if (ev.target.id == "wrapper") {
        closeModal();
    }
});

// Первоначальный рендер
renderTable();
