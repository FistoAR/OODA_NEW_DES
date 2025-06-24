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


const productsLink = document.querySelector('.products-link');
const positionFixed = document.querySelector('.positoin-flxed');

let isOverLink = false;
let isOverMenu = false;
let hideTimeout = null;

function updateMenuVisibility() {
  if (isOverLink || isOverMenu) {
    // Clear hide timer if hovering either
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    positionFixed.classList.add('active');
  } else {
    // Delay hiding menu to prevent flicker on gap
    hideTimeout = setTimeout(() => {
      positionFixed.classList.remove('active');
      hideTimeout = null;
    }, 150); // 150ms delay (adjust if needed)
  }
}

productsLink.addEventListener('mouseenter', () => {
  isOverLink = true;
  updateMenuVisibility();
});

productsLink.addEventListener('mouseleave', () => {
  isOverLink = false;
  updateMenuVisibility();
});

positionFixed.addEventListener('mouseenter', () => {
  isOverMenu = true;
  updateMenuVisibility();
});

positionFixed.addEventListener('mouseleave', () => {
  isOverMenu = false;
  updateMenuVisibility();
});


const gridItems = document.querySelectorAll('.grid-item-card');

gridItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove 'active' class and icon from all items
    gridItems.forEach(i => {
      i.classList.remove('active');
      const icon = i.querySelector('img.select-icon');
      if (icon) {
        i.removeChild(icon);
      }
    });

    // Add 'active' class and icon to the clicked item
    item.classList.add('active');

    const img = document.createElement('img');
    img.src = './assets/images/blue_select_icon.svg';
    img.alt = 'select icon';
    img.classList.add('select-icon'); // Add a class to easily target the icon later
    item.appendChild(img);

    // uncomment the below if you need onbutton click - hide product navbar
    // isOverLink = false;
    // isOverMenu = false;
    // updateMenuVisibility();
  });
});
// const navbar = document.getElementById('navbar');
// const stickyOffset = navbar.offsetTop;

// window.addEventListener('scroll', () => {
//   if (window.pageYOffset > stickyOffset) {
//     navbar.classList.add('fixed');
//   } else {
//     navbar.classList.remove('fixed');
//   }
// });

