// app entrypoint
//import Carousel from './components/Carousel';

const fox = document.getElementById('fox')!;
const crow = document.getElementById('crow')!;
const skull = document.getElementById('skull')!;
const bear = document.getElementById('bigbear')!;
const seahorse = document.getElementById('seahorse')!;
const contact = document.getElementById('contact')!;
const itemsReveal = document.querySelectorAll('.item-reveal');
//const carousel = document.getElementById('carousel')!;

const observer = new IntersectionObserver( entries => {
    for (const entry of entries) {
        if(entry.isIntersecting){
            const id = entry.target.id
            document.body.classList.add('bg-cream');
            if( id === 'fox' || id === 'contact'){
                document.body.classList.toggle('bg-cream');
            }
            if(id.match(/item[0-9]/i)){
                entry.target.classList.add('is-visible');
            }
        }
    }
}, {
    // observer options
});

if(document.body !== null){
    // Carousel
//const gallery = new Carousel(carousel);

// transform element based in Y axe for scroll event
const transformElement = (el: HTMLElement, size: number) => {
    el!.style.transform = `translate(0, -${window.scrollY - size }px)`;
}

const resetTransformElement = (el: HTMLElement) => {
    el!.style.transform = `translate(0, 0)`;
}

observer.observe(fox);
observer.observe(crow);
observer.observe(contact);

// scroll animate throttle
(function(){

  const throttle = (type: string, name: string) => {
    let running = false;
    const func = () => {
      if (running) return; 
      running = true;
      requestAnimationFrame(function(){
        window.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    window.addEventListener(type, func);
  };
  
  throttle("scroll", "optimizedScroll");

})();

for (let i = 0; i < itemsReveal.length; i++) {
    const element = itemsReveal[i];
    element.setAttribute('id', `item${i}`);
    observer.observe(document.getElementById(`item${i}`)!);
}

window.addEventListener("optimizedScroll", () => {
    let width = window.innerWidth;

    fox!
        .style
        .transform = `translate(${width > 1000 ? "-50%" : "0"}, -${window.scrollY}px)`;
    transformElement(skull, 800);
    transformElement(bear,2000);
    transformElement(seahorse,3200);
    transformElement(crow,4300);
});

// animate first wolf loader
window.addEventListener('DOMContentLoaded', () => {
    const timeout1 = setTimeout(() => {
        document.querySelector('#loader .filter')?.animate([
            {transform: 'translateX(100%)'},
            {transform: 'translateX(0)'}
        ], {
            duration: 500
        });
    }, 3000);
    const timeout2 = setTimeout(() => {
        const animationProperties = [
            { opacity: 0, transform: 'translateY(-6px)'},
            { opacity: 1, transform: 'translateY(0)'}
        ]

        document.getElementById('loader')!.remove();
        document.getElementById('headline')?.animate(animationProperties, {
            duration: 2000
        });
        document.getElementById('menu')?.animate(animationProperties, {
            duration: 1500,
            delay: 500
        });
        fox.animate([
            {opacity:0},
            {opacity:1}
        ], {duration: 2000})
    }, 3500);
    const timeout3 = setTimeout(() => {
        document.getElementById('menu')!.style.opacity = '1'
        clearInterval(timeout1);
        clearInterval(timeout2);
        clearInterval(timeout3);
    }, 4500);
});

if(window.scrollY === 0){
    resetTransformElement(skull);
    resetTransformElement(bear);
    resetTransformElement(seahorse);
    resetTransformElement(crow);
}

}

