document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');

    // Change icon based on menu state
    const icon = this.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking on a link (optional)
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      if (window.innerWidth <= 991) {
        navLinks.classList.remove('active');
        mobileMenuToggle.querySelector('i').classList.remove('fa-times');
        mobileMenuToggle.querySelector('i').classList.add('fa-bars');
      }
    });
  });


  let time_line_svg = "./assets/svg/section_timeline.svg";
  if (window.innerWidth <= 991) {
    time_line_svg = "./assets/svg/timeline_mob.svg";
  }
  fetch(time_line_svg)
    .then(response => response.text())
    .then(svgText => {
      document.getElementById("timeline-container").innerHTML = svgText;
      document.getElementById('placeholder-div').style.display = 'none'; // Hide the placeholder div
      animateSVGPaths();
    });

  // GSAP + ScrollTrigger animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-text", {
    scrollTrigger: {
      trigger: ".hero-text",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 200,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power2.out"
  });

  gsap.from(".hero-video img", {
    scrollTrigger: {
      trigger: ".hero-video",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 300,
    opacity: 0,
    duration: 1,
    delay: 0,
    ease: "power2.out"
  });

  gsap.from(".hero-bottom-text-container", {
    scrollTrigger: {
      trigger: ".hero-bottom-text-container",
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  function animateSVGPaths() {
    gsap.registerPlugin(ScrollTrigger);

    const pathsWithId = document.querySelectorAll('#timeline-container svg path[id="text"]');

    if (pathsWithId.length === 0) {
      console.log("No paths with ID found!");
      return;
    }

    pathsWithId.forEach(path => {
      const length = path.getTotalLength();

      // Set initial dash offset
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      // Animate on scroll
      gsap.from(path, {
        opacity: 0,
        y: 100,
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          console.log(`Animation complete for path ID: ${path.id}`);
        },
        scrollTrigger: {
          trigger: path,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    });

    const svgLine = document.querySelectorAll('#timeline-container svg path[id="straightLine"]');
    svgLine.forEach(line => {
      const length = line.getTotalLength(); // Get the actual path length

      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      gsap.to(line, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 6,
        ease: "power2.out",
        onComplete: () => {
          console.log(`Animation complete for path ID: ${line.id}`);
          // Don't reset to full offset here unless you plan to animate again
        },
        scrollTrigger: {
          trigger: line,
          start: "top+=100 bottom", // waits for the top of the element to be 100px *below* the bottom of the viewport
          toggleActions: "play none none none",

        }
      });
    });

    const svgCircle = document.querySelectorAll('#timeline-container svg circle[id="circle"]');
    svgCircle.forEach(circle => {
      const length = circle.getTotalLength(); // Get the actual path length

      gsap.set(circle, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      gsap.to(circle, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          console.log(`Animation complete for path ID: ${circle.id}`);
          // Don't reset to full offset here unless you plan to animate again
        },
        scrollTrigger: {
          trigger: circle,
          start: "top+=100 bottom", // waits for the top of the element to be 100px *below* the bottom of the viewport
          toggleActions: "play none none none",

        }
      });
    });

    const svgG = document.querySelectorAll('#timeline-container svg g[id="circle"], circle[id="circle2"]');
    svgG.forEach(G => {
      gsap.to(G, {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power2.out",
        onComplete: () => {
          console.log(`Animation complete for path ID: ${G.id}`);
        },
        scrollTrigger: {
          trigger: G,
          start: "top+=100 bottom", // waits for the top of the element to be 100px *below* the bottom of the viewport
          toggleActions: "play none none none",

        }
      });
    });

  }

  // technical properties, application, and benefits
  fetch('./assets/svg/technical_features.svg')
    .then(response => response.text())
    .then(svgText => {
      document.getElementById('panel1').innerHTML = svgText;
      startAnimationCircle();
    })
    .catch(error => {
      console.error('Error loading SVG:', error);
    });

  gsap.registerPlugin(ScrollTrigger);

  const panels = document.querySelectorAll(".panel");
  const buttons = document.querySelectorAll(".button-container button");
  panels.forEach((panel, i) => {
    gsap.set(panel, {
      opacity: i === 0 ? 1 : 0,
      zIndex: i === 0 ? 9 : 1
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "pinning",
      trigger: ".section-2",
      start: "top top",
      end: `+=${panels.length * 110}%`, // Adjust based on number of panels      
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const index = getCurrentFullyVisiblePanelByProgress(self.progress);
        updateButtons(index);
      }
    }
  });

  // Timeline for panels
  panels.forEach((panel, index) => {
    const label = `panel${index}`;
    const nextTime = index * 3;

    tl.add(label, nextTime);

    // Fade in panel
    tl.to(panel, {
      opacity: 1,
      duration: 0.3,
      zIndex: 9,

    }, label);


    // Custom animation calls
    if (index === 1) tl.call(() => animateCards(), null, label + "+=0.01");
    if (index === 2) tl.call(() => animatePanel3(), null, label + "+=0.01");

    // Fade out (except last panel)
    if (index < panels.length - 1) {
      tl.to(panel, {
        opacity: 0,
        duration: 0.3,
        zIndex: 1
      }, label + "+=2.7");
    }
  });

  // ✨ Add an artificial pause after the last panel
  tl.to({}, { duration: 1 }); // this dummy tween gives "extra time"

  function getCurrentFullyVisiblePanelByProgress(progress) {
    const totalPanels = panels.length;
    const activeIndex = Math.round(progress * (totalPanels - 1));
    return activeIndex;
  }



  let lastIndex = -1;

  function updateButtons(activeIndex) {
    if (activeIndex === lastIndex) return;
    lastIndex = activeIndex;

    buttons.forEach((btn, i) => {
      btn.classList.toggle("active", i === activeIndex);
    });
  }

  // Scroll to panel on button click
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const trigger = ScrollTrigger.getById("pinning");
      if (trigger) {
        const totalScroll = trigger.end - trigger.start;
        const targetScroll = trigger.start + (totalScroll * index / (panels.length - 1));
        gsap.to(window, {
          scrollTo: { y: targetScroll },
          duration: 1,
          ease: "power2.inOut"
        });
      }
    });
  });

  // Assign ScrollTrigger ID
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.pin === document.querySelector(".section-2")) {
      trigger.id = "pinning";
    }
  });


  function startAnimationCircle() {
    const strokePaths = document.querySelectorAll('#line-stroke');

    strokePaths.forEach((strokePath) => {
      const length = strokePath.getTotalLength();

      // Start with stroke only
      gsap.set(strokePath, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
        fill: "transparent"
      });

      gsap.to(strokePath, {
        strokeDashoffset: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: strokePath,
          start: "top 30%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(strokePath, {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: "power2.out",
              onComplete: () => {
                // Animate fill from transparent to white
                gsap.to(strokePath, {
                  fill: "white",
                  duration: 0.2,
                  ease: "power1.inOut"
                });

                // Optional: remove stroke
                gsap.to(strokePath, {
                  stroke: "none",
                  duration: 0.5,
                  delay: 0.5
                });
              }
            });
          }
        }
      });
    });

    const popupGroups = document.querySelectorAll('.popup-group');

    popupGroups.forEach((group, index) => {
      const rects = group.querySelectorAll('rect');
      const mask = group.querySelector('mask');
      const paths = group.querySelectorAll('path');

      // Filter out paths inside <mask>
      const visiblePaths = Array.from(paths).filter(path => {
        return !mask || !mask.contains(path);
      });

      // Set initial state
      gsap.set([...rects, ...visiblePaths], {
        opacity: 0,
        scale: 0.1
      });

      // ScrollTrigger for each group
      ScrollTrigger.create({
        trigger: group,
        start: "top 30%",
        onEnter: () => {
          const delayPerGroup = index * 0.3; // Adjust this value for delay between each group

          gsap.delayedCall(delayPerGroup, () => {
            const tl = gsap.timeline();

            // Animate rects
            tl.to(rects, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: 0.1
            });

            // Animate paths
            tl.to(visiblePaths, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.05
            }, "+=0.2");
          });
        },
        toggleActions: "play none none none"
      });
    });

    const opacityE = document.querySelectorAll('#opacity-fill');
    opacityE.forEach((element) => {
      gsap.set(element, {
        opacity: 0
      });

      gsap.to(element, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 30%",
          toggleActions: "play none none none"
        }
      });
    });
  }

  // applications section animation
  function animateCards() {
    // Animate all cards with stagger
    const cards = document.querySelectorAll("#panel2 .application-card-container");

    gsap.fromTo(cards,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        delay: 0.35,
        ease: "power2.out",
        stagger: 0.1,
        onComplete: () => console.log("Cards animation done"),
      }
    );
  }

  function animatePanel3() {
    // Left side slide in from left + fade
    gsap.fromTo("#panel3 .benefits-left-section",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Right side benefits cards stagger fade and slide up
    gsap.fromTo("#panel3 .benefits-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.3 // start after left section animation begins
      }
    );
  }

  // text over video section
  gsap.to(".text-overlay h1", {
    rotate: 0,
    opacity: 1,
    duration: 1,
    delay: 0.5,
    ease: "power4.out",
    stagger: 0.25, // Adds a delay between each h1
    scrollTrigger: {
      trigger: ".text-overlay",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // mobile view and tab view content's animation
  gsap.utils.toArray('.mob-sec-title-main').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  // Animate Cards
  gsap.utils.toArray('.mob-sec-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
    });
  });

  // Animate Application Grid Cards
  gsap.utils.toArray('.mob-sec-grid-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.05,
      ease: 'back.out(1.7)',
    });
  });

  // Animate Benefits Cards
  gsap.utils.toArray('.mob-sec-benefits-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      x: -50,
      opacity: 0,
      duration: 0.6,
      ease: 'power1.out',
    });
  });

  // Animate Benefits Title & Video Section
  gsap.from('.mob-sec-benefits-title-block', {
    scrollTrigger: {
      trigger: '.mob-sec-benefits-title-block',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.mob-sec-benefits-video-container', {
    scrollTrigger: {
      trigger: '.mob-sec-benefits-video-container',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power2.out',
  });

});