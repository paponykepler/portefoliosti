const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const menuLinks = menu.querySelectorAll('a');

menuBtn.addEventListener("click", function() {  // cette fonction permet de cacher la pge principale et c'est seule la boîte du menu qui pourra scroller
    menu.classList.toggle("open");
    document.body.classList.toggle("menu-open");   //toggler = cliquer; menu-open c'est pour arrêter le scroll de la page
});

//fermer le menu quand on clic sur le lien 
menuLinks.forEach(function(link) {
    link.addEventListener("click", function () {
        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
    })
})




// hero carousel

const hero = document.getElementById("hero");
if(hero) {
  const slides = hero.querySelectorAll(".hero_slide");
  const dots = hero.querySelectorAll(".hero_dot");
  let index = 0;            // let est pour un entier
  let timer = null;        // null : pour mettre en pause
  const delay = 6000;     // le temps que chaque image passe sur l'écran

  function showSlide(i) {
     index = (i + slides.length) % slides.length; // pour savoir l'image qui doit slider 1erement puis le suivant  etc..
     slides.forEach( function(slide, n) {
        slide.classList.toggle("is-active", n === index);
     });
     dots.forEach(function (dot, n) {
        const active = n === index;
        dot.classList.toggle("is-active", active);   //relier le point à l'image ie si c'est le 1er point qui est activé donc c'est la 1ere image qui est sélectionnée
        dot.setAttribute("aria-current", active? "true" : "false");
    });                                           
    }


    function nextSlide() {
        showSlide(index + 1);
    }


    function startAutoPlay() {
        stopAutoPlay();
        if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
            return;
        }
        timer = window.setInterval(nextSlide, delay);
    }

    function stopAutoPlay() {
        if(timer){
            window.clearInterval(timer);
            timer = null;
        }
    }

    dots.forEach(function (dot, i){
        dot.addEventListener("click", function(){
            showSlide(i);
            startAutoPlay();
        });
    });

hero.addEventListener("mouseenter", stopAutoPlay);
hero.addEventListener("mouseleave", startAutoPlay);

showSlide(0);
startAutoPlay();
}