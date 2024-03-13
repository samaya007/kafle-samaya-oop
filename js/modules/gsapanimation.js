
export function gsapanimation(){

  gsap.registerPlugin(ScrollTrigger);



const gameImages = document.querySelector(".obimage");
  if (gameImages) {
    gsap.from('.obimage', {
      duration: 1,
      y: '-1vw',
      opacity: 0,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: ".obj",
        toggleActions: "restart none none none",
      },
    });
  }

};