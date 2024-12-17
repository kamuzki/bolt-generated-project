export function initSidebar() {
      const menuToggle = document.getElementById('menu-toggle');
      const sidebar = document.querySelector('.sidebar');
      const mainContent = document.querySelector('.main-content');
      const header = document.querySelector('.header');
      const navItems = document.querySelectorAll('.main-nav-item');

      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        updateMainContentMargin();
      });

      function updateMainContentMargin() {
        if (sidebar.classList.contains('collapsed')) {
          mainContent.style.marginLeft = '90px';
          header.style.left = '90px';
          header.style.width = 'calc(100% - 90px)';
        } else {
          mainContent.style.marginLeft = '270px';
          header.style.left = '270px';
          header.style.width = 'calc(100% - 270px)';
        }
      }

      updateMainContentMargin();

      navItems.forEach(navItem => {
        const subNav = navItem.querySelector('.sub-nav');
        const navLink = navItem.querySelector('a');

        if (subNav) {
          navLink.addEventListener('click', (event) => {
            event.preventDefault();

            // Close all other submenus
            navItems.forEach(otherNavItem => {
              if (otherNavItem !== navItem) {
                const otherSubNav = otherNavItem.querySelector('.sub-nav');
                if (otherSubNav) {
                  otherSubNav.style.display = 'none';
                }
              }
            });

            // Toggle the current submenu
            const isSubNavVisible = subNav.style.display !== 'none';
            subNav.style.display = isSubNavVisible ? 'none' : 'block';
          });

          // Prevent clicks on sub-nav items from closing the menu or triggering other actions
          subNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
              event.preventDefault(); // Prevent default action
              event.stopPropagation(); // Stop event propagation
              // Handle the submenu item click here (e.g., navigate to the link)
              console.log('Submenu item clicked:', event.target.href);
            });
          });
        }
      });
    }
