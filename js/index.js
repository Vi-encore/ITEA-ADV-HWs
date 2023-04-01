const navMenuBtnMob = document.querySelector(".nav-menu__btn");
const navMenuCollapse = document.querySelector(".nav-menu__collapse");

navMenuBtnMob.addEventListener("click", () => {
  navMenuBtnMob.classList.toggle("nav-menu__btn-rotate");
  navMenuCollapse.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (navMenuCollapse.contains(e.target)) {
    navMenuCollapse.classList.toggle("hidden");
    navMenuBtnMob.classList.toggle("nav-menu__btn-rotate");
  }
});
