
export function gsapanimation(){

  gsap.registerPlugin(ScrollTrigger);

//selcting the game iamge container
const gameImages = document.querySelector(".obimage");
  if (gameImages) {
    gsap.from('.obimage', {
      duration: 1,
      y: '-1vw',
      opacity: 0,
      ease: 'power2.in', //ease
      scrollTrigger: {
        trigger: ".obj", //triggering element
        toggleActions: "restart none none none",
      },
    });
  }

};