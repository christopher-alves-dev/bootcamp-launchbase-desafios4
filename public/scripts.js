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

//=== PAGINAÇÃO ===
// totalPages = 20
// selectedPage = 15 - página selecionada
// [1, ..., 13, 14, 15, 16, 17, ..., 20]
// 
function paginate(selectedPage, totalPages) {

  let pages = [],
    oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {


    //primeira e última página(1 e 20)
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;

    //Mostrar o número das páginas posteriores, se a página atual for menor ou igual a página selecionada + 2. Neste caso a página selecionada é 15, então mostrará a página 16 e 17.  
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    
    //Mostrar o número das páginas anteriores, se a página atual for maior ou igual a página selecionada - 2. Neste caso a página selecionada é 15, então mostrará a página 14 e 13.  
    const pagesBeforerSelectedPage = currentPage >= selectedPage - 2;
    
    //Se a primeira página for = 1 ou a página atual for o total de páginas (20) OU as páginas antes da selecionada for maior ou igual a página selecionada - 2 E as páginas posteriores da selecionada for menor ou igual a página selecionada + 2.
    if(firstAndLastPage || pagesBeforerSelectedPage && pagesAfterSelectedPage) {

      if(oldPage && currentPage - oldPage > 2) {
      // enviar para dentro de pages "..."
        pages.push("...");
      }

      //Se existir a posição do anterior (oldPage) E a página atual menos a posição anterior for igual a 2.
      if(oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }
    
      pages.push(currentPage)
    
      oldPage = currentPage
    }
  }

  return pages
}

const pagination = document.querySelector(".pagination");
function createPagination(pagination) {

  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page, total);

  let elements = "";

  for (let page of pages) {
    if(String(page).includes("...")) {
      elements+= `<span>${page}</span>`

    } else {
      if(filter) {
        elements += `<a href="?page=${page}&filter=${filter}"> ${page}</a>`

      } else {
        elements += `<a href="?page=${page}"> ${page}</a>`

      }
    }
  }

  pagination.innerHTML = elements
}

if(pagination) {
  createPagination(pagination);
}

