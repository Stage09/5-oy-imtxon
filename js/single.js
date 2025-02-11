// Загружаем данные студента из localStorage
let student = JSON.parse(localStorage.getItem("single")) || [];
let itemImg = document.querySelector(".single");

// Проверяем, есть ли данные
if (student.length > 0) {
    let studentData = student[0]; // Берем первый (и единственный) объект из массива

    itemImg.className = "ml-[29px] bg-white flex gap-6 items-center w-[592px] pt-[28px] pb-[148px] mt-[41px] rounded-[24px]";
    itemImg.innerHTML = `
        <img class="w-[209px] h-[216px] rounded-[24px]" src="${studentData.image || './images/person.svg'}" alt="Student Image">
        <div class="flex flex-col justify-between gap-4">
            <div>
                <span class="text-[#ACACAC] text-[12px] font-semibold">Name</span>
                <p class="text-[14px] font-normal">${studentData.name}</p>
            </div>
            <div>
                <span class="text-[#ACACAC] text-[12px] font-semibold">Email</span>
                <p class="text-[14px] font-normal">${studentData.email}</p>
            </div>
            <div>
                <span class="text-[#ACACAC] text-[12px] font-semibold">Phone</span>
                <p class="text-[14px] font-normal">${studentData.phone}</p>
            </div>
            <div>
                <span class="text-[#ACACAC] text-[12px] font-semibold">Date admission</span>
                <p class="text-[14px] font-normal">${studentData.date}</p>
            </div>
        </div>
    `;
} else {
    itemImg.innerHTML = `<p class="text-red-500">No student data found!</p>`;
}

// Обработчик для кнопки выхода
let exitPage = document.querySelector(".exit");
exitPage.addEventListener("click", function() {
    window.close();  // Закрыть текущее окно
});


// -------------------------------

  // Сохранение фото в localStorage
// Функция сохранения изображения в localStorage
function saveProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        const imageData = reader.result;
        localStorage.setItem('profileImage', imageData);
        document.getElementById('preview').src = imageData;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Функция загрузки сохранённого изображения при старте
function loadProfileImage() {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        document.getElementById('preview').src = savedImage;
    }
}

// Загружаем изображение при загрузке страницы
window.onload = loadProfileImage;


const notificationModal = document.getElementById("notification-modal");
const notificationIcon = document.getElementById("notification-icon");
const closeNotificationButton = document.getElementById("close-notification");

notificationIcon.addEventListener("click", () => {
    notificationModal.classList.remove("hidden");
    setTimeout(() => {
        notificationModal.classList.add("opacity-100");
        notificationModal.querySelector("div").classList.add("scale-100");
    }, 10);
});

closeNotificationButton.addEventListener("click", () => {
    notificationModal.classList.remove("opacity-100");
    notificationModal.querySelector("div").classList.remove("scale-100");
    setTimeout(() => notificationModal.classList.add("hidden"), 300);
});