// === MENU TOGGLE ===
const btnOpenMenuMobile = document.querySelector('.btnOpenMenu');
const sliderMenu = document.querySelector('header .nav');
const btnCloseMenuMobile = document.querySelector('.btnCloseMenu');

btnOpenMenuMobile.addEventListener('click', function() {
  sliderMenu.classList.toggle('showMenu');
  btnCloseMenuMobile.style.display = 'block';
  btnOpenMenuMobile.style.display = 'none';
})

btnCloseMenuMobile.addEventListener('click', function() {
  sliderMenu.classList.toggle('showMenu');
  btnCloseMenuMobile.style.display = 'none';
  btnOpenMenuMobile.style.display = 'block';
})

// === Individual Page ===
const cards = document.querySelectorAll('.card');

// for (let card of cards) {
//   card.addEventListener('click', function() {
//     //pegar o atributo id 
//     const addressId = card.getAttribute('id');
   
//     window.location.href = `/course/${addressId}`;
    
//   })
// }