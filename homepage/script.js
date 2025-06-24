gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true
});

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.short-brief-count');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const target = +counter.dataset.count;
          const suffix = counter.dataset.splitend || '';
          let current = 0;
          const increment = Math.ceil(target / 100);

          const updateCount = () => {
            if (current < target) {
              current += increment;
              counter.innerText = (current < target ? current : target) + suffix;
              setTimeout(updateCount, 20);
            } else {
              counter.innerText = target + suffix;
            }
          };

          updateCount();
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('.short-brief-card'));
});

// industries we server section
if (window.innerWidth >= 992) {

  window.addEventListener('load', () => {

    const tlCustom = gsap.timeline({
      scrollTrigger: {
        trigger: ".industries-we-serve-section-main",
        start: "top top",
        end: () => "+=" + document.querySelector(".industries-we-serve-content").offsetHeight * 2.5,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Your existing animations
    tlCustom.to(".industries-we-serve-circle-bg", {
      scale: 4,
      xPercent: 10,
      transformOrigin: "center center",
      ease: "none"
    }, 0);

    tlCustom.to(".industries-we-serve-image-wrapper", {
      xPercent: 20,
      ease: "none"
    }, 0);

    tlCustom.to(".industries-we-serve-top-left", {
      yPercent: -1600,
      opacity: 0,
      ease: "none"
    }, 0);

    tlCustom.to(".industries-we-serve-bottom-right", {
      yPercent: 1600,
      opacity: 0,
      ease: "none"
    }, 0);

    tlCustom.fromTo(".industries-we-serve-content",
      {
        yPercent: 100,
        borderTopRightRadius: 350,
      },
      {
        yPercent: 0,
        borderTopRightRadius: 0,
        ease: "power2.out"
      },
      0.9
    );

    tlCustom.from(".industries-we-serve-content-inner", {
      y: 950,
      duration: 1,
      ease: "power2.out"
    }, 2);

    // Curtain reveal animation for "We Serve"
    // tl.from(".industries-we-serve-weServe", {
    //   width: 0,  // Start with zero width (hidden)
    //   opacity: 0,  // Make it hidden initially
    //   transformOrigin: "center center", // Set the transformation to start from the center
    //   duration: 1,
    //   ease: "power2.out"
    // }, 2.5);

    // tl.to(".industries-we-serve-weServe", {
    //   width: "auto",  // Expand the width to reveal the text
    //   opacity: 1,  // Fade in the text
    //   duration: 1,
    //   ease: "power2.out"
    // }, 3);

});

}

const images = [
    "./homepage/images/industries_we_serve/automotive.webp",
    "./homepage/images/industries_we_serve/aerospace.webp",
    "./homepage/images/industries_we_serve/electronics.webp",
    "./homepage/images/industries_we_serve/medical.webp",
    "./homepage/images/industries_we_serve/ev_vehicles.webp",
    "./homepage/images/industries_we_serve/fastners.webp",
    "./homepage/images/industries_we_serve/railways.webp",
    "./homepage/images/industries_we_serve/mining.webp",
    "./homepage/images/industries_we_serve/marine.webp",
];

function changeImage(index) {
    const allCards = document.querySelectorAll('.industries-we-serve-sec-3-new-card');
    allCards.forEach(card => card.classList.remove('active'));
    allCards[index].classList.add('active');

    const img = document.getElementById('industries-we-serve-sec-3-new-main-image');
    img.src = images[index];
}

const mobileImages = [
  "./homepage/images/industries_we_serve/automotive.webp",
  "./homepage/images/industries_we_serve/aerospace.webp",
  "./homepage/images/industries_we_serve/electronics.webp",
  "./homepage/images/industries_we_serve/medical.webp",
  "./homepage/images/industries_we_serve/ev_vehicles.webp",
  "./homepage/images/industries_we_serve/fastners.webp",
  "./homepage/images/industries_we_serve/railways.webp",
  "./homepage/images/industries_we_serve/mining.webp",
  "./homepage/images/industries_we_serve/marine.webp",
];

function changeImageMobile(index) {
  const allCards = document.querySelectorAll('.industries-we-serve-mobile-card');
  allCards.forEach(card => card.classList.remove('active'));
  allCards[index].classList.add('active');

  const img = document.getElementById('industries-we-serve-mobile-image');
  img.src = mobileImages[index];

  document.getElementById('industries-we-serve-mobile-image').scrollIntoView({ behavior: 'smooth' });

}

window.addEventListener('load', () => {



    
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



    const mainSection = document.querySelector(".made-in-sec-main-section");
    const gradientOverlay = document.querySelector(".made-in-sec-gradient-overlay");
    const revealCircle = document.querySelector(".made-in-sec-reveal-circle");
  
    const textGroup = document.querySelector(".made-in-sec-text-group");
  
  
    const maxRadiusPx = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
  
    // ✅ Set initial mask and reveal circle position
    gradientOverlay.style.webkitMaskImage = `radial-gradient(circle 80px at center, transparent 99%, black 100%)`;
    gradientOverlay.style.maskImage = `radial-gradient(circle 80px at center, transparent 99%, black 100%)`;
    revealCircle.style.transform = `scale(${80 / 40})`;
  
    if (window.innerWidth < 480) {
      revealCircle.style.transform = `scale(${80 / 20})`; // Adjust for smaller screens
      gradientOverlay.style.webkitMaskImage = `radial-gradient(circle 40px at center, transparent 99%, black 100%)`;
      gradientOverlay.style.maskImage = `radial-gradient(circle 40px at center, transparent 99%, black 100%)`;
    }
  
    ScrollTrigger.create({
      trigger: mainSection,
      start: "top top",
      end: "+=100%",  // Pin for 1 viewport height, adjust if needed
      scrub: true,
      pin: true,
  
      onUpdate: (self) => {
        const progress = self.progress;
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
  
        // Animate radius from small to large
        const radiusPx = 80 + clampedProgress * (maxRadiusPx - 80);
  
        // Use mask: transparent inside circle (reveals video), black outside (gradient overlay visible)
        gradientOverlay.style.webkitMaskImage = `radial-gradient(circle ${radiusPx}px at center, transparent 99%, black 100%)`;
        gradientOverlay.style.maskImage = `radial-gradient(circle ${radiusPx}px at center, transparent 99%, black 100%)`;
  
        // Scale revealCircle div accordingly (optional)
        const scale = radiusPx / 40;  // base radius half of 80px
        revealCircle.style.transform = `scale(${scale})`;
      },
    });
  
  
  
    gsap.to(textGroup, {
      y: "-200px",
      opacity: 0,
      duration: 0.02,
      ease: "power1.out",
      scrollTrigger: {
        trigger: mainSection,
        start: "top top",
        scrub: true,
      },
    });


    
    
    /* ── STEP DATA ──────────────────────────────────────────────────────── */
    const steps = [
      {
        heading: "Invisible",
        text: "So strength didn’t come at the cost of clarity.",
        leftImage: "./homepage/images/what_if_imges/Card 100.png",
        rightImage: "./homepage/images/what_if_imges/Card 101.png"
      },
      {
        heading: "Instant",
        text: "So your process never had to wait for performance.",
        leftImage: "./homepage/images/what_if_imges/Card 101.png",
        rightImage: "./homepage/images/what_if_imges/Card 100.png"
      },
      {
        heading: "Unbreakable",
        text: "So you could trust every joint—no matter the challenge.",
        leftImage: "./homepage/images/what_if_imges/Card 100.png",
        rightImage: "./homepage/images/what_if_imges/Card 101.png"
      },
       {
        heading: "Smart",
        text: "So bonding adapted to materials, environments, and expectations.",
        leftImage: "./homepage/images/what_if_imges/Card 100.png",
        rightImage: "./homepage/images/what_if_imges/Card 101.png"
      },
      {
        heading: "Versatile",
        text: "So one adhesive could serve industries, not just applications.",
        leftImage: "./homepage/images/what_if_imges/Card 101.png",
        rightImage: "./homepage/images/what_if_imges/Card 100.png"
      },
    ];
    
    /* ── DOM SHORTCUTS ──────────────────────────────────────────────────── */
    const blueDot       = document.getElementById("what-if-blueDot");
    const numberSpan    = document.getElementById("what-if-stepNumber");
    const centerHeading = document.getElementById("what-if-centerHeading");
    const centerText    = document.getElementById("what-if-centerText");
    const leftImage     = document.getElementById("what-if-leftImage");
    const rightImage    = document.getElementById("what-if-rightImage");
    const verticalLine  = document.getElementById("what-if-verticalLine");
    
    /* ── CONTENT SWAP UTILITY ───────────────────────────────────────────── */
    let currentStep = 0;
    
    function swapContent(stepIndex) {
      if (stepIndex === currentStep) return;
      currentStep = stepIndex;
    
      const s = steps[stepIndex];
    
      // fade out content before swap
      const tl = gsap.timeline();
      tl.to([centerHeading, centerText, verticalLine], { opacity: 0, duration: 0.3 })
    
        .to([leftImage, rightImage], {
          opacity: 0,
          scale: 0.8,
          duration: 0.25
        })
    
        .set(leftImage, { attr: { src: s.leftImage } })
        .set(rightImage, { attr: { src: s.rightImage } })
    
        .to([leftImage, rightImage], {
          opacity: 1,
          scale: 1,
          duration: 0.25
        })
    
        .add(() => {
          numberSpan.textContent = stepIndex + 1;
          centerHeading.textContent = s.heading;
          centerText.textContent = s.text;
        })
    
        .to([centerHeading, centerText, verticalLine], {
          opacity: 1,
          duration: 0.5
        });
    }
    
    /* ── INITIAL STATE ──────────────────────────────────────────────────── */
    gsap.set(blueDot, { xPercent: -50, yPercent: -50 });
    swapContent(0); // Set first step properly
    
    /* ── MASTER TIMELINE ────────────────────────────────────────────────── */
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: "#what-if-arcSection",
        start: "top top",
        end: () => `+=${steps.length * window.innerHeight}`,
        scrub: true,
        pin: true,
        snap: {
          snapTo: value => {
            const segments = steps.length - 1;
            return Math.round(value * segments) / segments;
          },
          duration: 0.3,
          ease: "power1.inOut"
        },
        onUpdate: self => {
          const progress = self.progress;
          const step = Math.round(progress * (steps.length - 1));
          if (step !== currentStep) {
            swapContent(step);
          }
        }
      }
    });
    
    /* ── DOT MOTION PATH PER STEP ───────────────────────────────────────── */
    for (let i = 0; i < steps.length - 1; i++) {
      master.to(blueDot, {
        duration: 3,
        motionPath: {
          path: "#what-if-entryArcPath",
          align: "#what-if-entryArcPath",
          alignOrigin: [0.5, 0.5],
          autoRotate: false
        },
        ease: "power1.inOut"
      });
    }
});

// products built to stick section
function initHorizontalScroll() {
  const isDesktop = window.innerWidth > 991;
  const section = document.querySelector("#productSection");
  const scrollWrapper = document.querySelector(".scroll-wrapper");

  
  gsap.set(section, { clearProps: 'all' });
  gsap.set(scrollWrapper, { clearProps: 'all' });

  if (isDesktop) {
    const scrollLength = section.scrollWidth - window.innerWidth;
    const horizontalTween = gsap.to(section, {
      x: () => -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: scrollWrapper,
        start: "top top",
        end: () => "+=" + scrollLength,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    });

    setupHeadings(horizontalTween);
  } else {
    setupHeadings(); // no containerAnimation for mobile
  }
}

function setupHeadings(horizontalTween) {
    const isDesktop = window.innerWidth > 991;

  const productRevealer = document.querySelector(".product-revealer");
  const targetWidth = productRevealer.scrollWidth;

  gsap.set(productRevealer, { width: 0, opacity: 0 });

  gsap.to(productRevealer, {
    scrollTrigger: isDesktop
  ? {
      containerAnimation: horizontalTween,
      trigger: productRevealer,
      start: "left center",
    }
  : {
      trigger: productRevealer,
      start: "left center",
    },
    width: targetWidth,
    opacity: 1,
    duration: 0.75,
    ease: "power2.out",
  });

  document.querySelectorAll(".heading p").forEach((p) => {
    const chars = p.textContent.split("");
    p.innerHTML = chars.map(c => `<span class="letter">${c === ' ' ? '&nbsp;' : c}</span>`).join("");

    gsap.fromTo(p.querySelectorAll(".letter"), {
      opacity: 0,
      y: 30,
      scale: 0.9
    }, {
      scrollTrigger: isDesktop
  ? {
      containerAnimation: horizontalTween,
      trigger: p,
      start: "top 90%",
    }
  : {
      trigger: p,
      start: "top 90%",
    },
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.04,
      duration: 0.35,
      ease: "back.out(1.7)",
    });
  });

  
}

window.addEventListener("load", () => {
    initHorizontalScroll();
    ScrollTrigger.refresh();
});

// Hover movement on bg-images
document.querySelectorAll('.card').forEach(card => {
    const bgImage = card.querySelector('.bg-image');
    const centerImage = card.querySelector('.center-image');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        const moveX = (x * 1.5).toFixed(2);
        const moveY = (y * 1.5).toFixed(2);

        bgImage.style.transform = `translate3d(${moveX}vw, ${moveY}vw, 0px)`;
        centerImage.style.transform = `translateX(-50%) translate3d(${moveX}vw, 0vw, 0px)`;
    });

    card.addEventListener('mouseleave', () => {
        bgImage.style.transform = `translate3d(0vw, 0vw, 0px)`;
        centerImage.style.transform = `translateX(-50%) translate3d(0vw, 0vw, 0px)`;
    });
});

// animate on scroll codes
 gsap.from(".hero-text .OODA-BOND-TEXT", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%", // Trigger when top of hero is at 80% of viewport
      toggleActions: "play none none none"
    },
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
  });

  gsap.from(".hero-video", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    scale: 0.95,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
  });

  // ===== Section 2: Why Choose OODA Bond =====
  gsap.utils.toArray(".new-why-choose-sec-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "back.out(1.4)"
    });
  });

    gsap.from(".short-brief-heading-1", {
    scrollTrigger: {
      trigger: ".short-brief-section",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".short-brief-heading-2", {
    scrollTrigger: {
      trigger: ".short-brief-section",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
  });

  // Animate Description and Button
  gsap.from([".short-brief-description", ".short-brief-button"], {
    scrollTrigger: {
      trigger: ".short-brief-section",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
  });

  // Animate Counters and Fade-In
  const counters = document.querySelectorAll(".short-brief-count");

  counters.forEach((counter, index) => {
    const endValue = parseInt(counter.dataset.count);
    const suffix = counter.dataset.splitend || "";
    
    gsap.from(counter, {
      scrollTrigger: {
        trigger: counter,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power1.out",
      onStart: () => {
        let value = 0;
        const updateCount = () => {
          if (value < endValue) {
            value += Math.ceil(endValue / 40); // Adjust step size here
            if (value > endValue) value = endValue;
            counter.innerText = value + suffix;
            requestAnimationFrame(updateCount);
          }
        };
        updateCount();
      }
    });
  });

   gsap.from(".made-in-sec-heading-1:first-child", {
    scrollTrigger: {
      trigger: ".made-in-sec-main-section",
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: -40,
    duration: 1,
    ease: "expo.out"
  });

  gsap.from(".made-in-sec-heading-2", {
    scrollTrigger: {
      trigger: ".made-in-sec-main-section",
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 40,
    duration: 1,
    delay: 0.2,
    ease: "expo.out"
  });

  // Reveal Circle Animation (pulse effect)
  gsap.fromTo(".made-in-sec-reveal-circle", {
    scale: 0,
    opacity: 0
  }, {
    scrollTrigger: {
      trigger: ".made-in-sec-main-section",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    scale: 1,
    opacity: 1,
    duration: 1.2,
    ease: "elastic.out(1, 0.6)"
  });

  // Mobile Text Animations
  gsap.from(".mob-made-in-sec-heading-1.mob-made-in-sec-rotated", {
    scrollTrigger: {
      trigger: ".mob-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".mob-made-in-sec-heading-2", {
    scrollTrigger: {
      trigger: ".mob-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power2.out"
  });

    function splitTextToSpans(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    const html = el.innerHTML;
    
    // Split content into text and <br> using RegExp
    const parts = html.split(/(<br\s*\/?>)/gi);

    const newHTML = parts.map(part => {
      if (part.match(/<br\s*\/?>/i)) {
        return "<br>";
      } else {
        return [...part].map(char => {
          if (char === " ") {
            return `<span class="reveal-letter">&nbsp;</span>`;
          }
          return `<span class="reveal-letter">${char}</span>`;
        }).join("");
      }
    }).join("");

    el.innerHTML = newHTML;
  });
}



  // Split both desktop and mobile titles
  splitTextToSpans(".what-if-center-text");
  splitTextToSpans(".mob-what-if-title");

  // Animate both sets
  gsap.to(".what-if-center-text .reveal-letter", {
    scrollTrigger: {
      trigger: ".what-if-center-text",
      start: "top 20%",
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.04
  });

  gsap.to(".mob-what-if-title .reveal-letter", {
    scrollTrigger: {
      trigger: ".mob-what-if-title",
      start: "top 20%",
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.04
  });