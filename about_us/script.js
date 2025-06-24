gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ✅ ScrollSmoother init
if (window.innerWidth > 500) {
  ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true
  });
}

// ✅ Pin the background container (NOT the image directly!)
if (window.innerWidth > 1) {
  ScrollTrigger.create({
      trigger: ".bg-section-wrapper",
      start: "top top",
      end: "bottom top",
      pin: ".bg-mask",
      pinSpacing: false,
      scrub: true
  });

}

// ✅ Optional: Add blur effect on scroll
gsap.to('.background-image', {
    scrollTrigger: {
        trigger: '.para-1',
        start: 'top center',
        end: 'bottom top',
        scrub: true
    },
    filter: 'blur(8px)',
    ease: 'none'
});

// ✅ Line Animation
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[js-line-animation]").forEach(el => {
        const originalText = el.textContent;
        let tl;

        function splitText() {
            el.textContent = originalText;
            const split = new SplitType(el, {
                types: "lines",
                tagName: "span",
                lineClass: "line"
            });

            el.querySelectorAll(".line").forEach(line => {
                const content = line.innerHTML;
                line.innerHTML = `<span class="line-inner">${content}</span>`;
            });

            const lines = el.querySelectorAll(".line-inner");
            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%", // trigger when top is near viewport
                    toggleActions: "play reverse play reverse"
                }
            });

            tl.fromTo(lines, {
                y: 200,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: (window.innerWidth > 500) ? 1 : 0.5,
                stagger: (window.innerWidth > 500) ? 0.2: 0.1,
                ease: "power2.out"
            });


        }

        splitText();

        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                tl?.kill();
                el.textContent = originalText;
                splitText();
            }, 150);
        });
    });
});

gsap.utils.toArray('.image-wrapper').forEach(wrapper => {
  gsap.fromTo(wrapper,
    { scale: 1.3,  },
    {
      scale: 1,
     
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: wrapper,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
});

  // BACKGROUND TEXT LETTER ANIMATION
  document.querySelectorAll('.background-text').forEach(textEl => {
    const letters = textEl.textContent.split("");
    textEl.innerHTML = letters.map(letter => `<span class="letter">${letter}</span>`).join("");

    gsap.set(textEl.querySelectorAll(".letter"), {
      opacity: 0,
      y: 150
    });

    gsap.to(textEl.querySelectorAll(".letter"), {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.10,
      scrollTrigger: {
        trigger: textEl,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });

  // CONTENT BOX ANIMATION
  gsap.utils.toArray('.content-box').forEach(box => {
    gsap.from(box, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: box,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });


    // Animate Title
  gsap.from(".specialties-title", {
    scrollTrigger: {
      trigger: ".specialties-title",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // Animate Cards (left & right)
  gsap.from([".left-card", ".right-card"], {
    scrollTrigger: {
      trigger: ".specialties-header",
      start: "top 85%",
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out"
  });

  // Animate Paragraph Section
  gsap.from(".specialties-content", {
    scrollTrigger: {
      trigger: ".specialties-content",
      start: "top 85%",
    },
    y: 60,
    opacity: 0,
    duration: 1.1,
    ease: "power2.out"
  });

  // Optional: Circle Border Fade-In
  gsap.from(".specialties-description img", {
    scrollTrigger: {
      trigger: ".specialties-content",
      start: "top 90%",
    },
    scale: 1.1,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
  });