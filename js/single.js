// // Загружаем данные студента из localStorage
// let student = JSON.parse(localStorage.getItem("single")) || [];
// let itemImg = document.querySelector(".single");

// // Проверяем, есть ли данные
// if (student.length > 0) {
//     let studentData = student[0]; // Берем первый (и единственный) объект из массива

//     itemImg.className = "ml-[29px] bg-white flex gap-[-52px] items-center w-[592px] pt-[28px] pb-[148px] mt-[41px] rounded-[24px]";
//     itemImg.innerHTML = `
//         <img class="w-[209px] h-[216px] rounded-[24px]" src="${studentData.image || './images/person.svg'}" alt="Student Image">
//         <div class="flex flex-col justify-between gap-4">
//             <div>
//                 <span class="text-[#ACACAC] text-[12px] font-semibold">Name</span>
//                 <p class="text-[14px] font-normal">${studentData.name}</p>
//             </div>
//             <div>
//                 <span class="text-[#ACACAC] text-[12px] font-semibold">Email</span>
//                 <p class="text-[14px] font-normal">${studentData.email}</p>
//             </div>
//             <div>
//                 <span class="text-[#ACACAC] text-[12px] font-semibold">Phone</span>
//                 <p class="text-[14px] font-normal">${studentData.phone}</p>
//             </div>
//             <div>
//                 <span class="text-[#ACACAC] text-[12px] font-semibold">Date admission</span>
//                 <p class="text-[14px] font-normal">${studentData.date}</p>
//             </div>
//         </div>
//     `;
// } else {
//     itemImg.innerHTML = `<p class="text-red-500">No student data found!</p>`;
// }

// // Обработчик для кнопки выхода
// let exitPage = document.querySelector(".exit");
// exitPage.addEventListener("click", function() {
//     window.close();  // Закрыть текущее окно
// });
