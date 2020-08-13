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



// capturando a página atual
const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links")

for (item of menuItems) {
  //Se a página atual for igual ao atributo href
  // if (currentPage == item.getAttribute("href")) {
  //   // adicionar classe active no link
  //   item.classList.add("active");

  //   
  // }
  //A forma anterior só tem um probleminha, que ao ir para a página de algum instrutor, a seleção da página instrutor sai, pois o location pathname agora é /instructors/1, por isto podemos fazer de outra forma, utilizando o includes, que é um objeto para Strings. 

  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");

    //Ao colocar item.getAttribute("href") no includes, nós estamos falando que se houver pelo menos /instructors ou /members (dependendo da página) ele irá retornar um true, executando o código. 
  }
  
}
