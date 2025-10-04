document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".nav__hamburger");
  const navMenu = document.querySelector(".nav__menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});