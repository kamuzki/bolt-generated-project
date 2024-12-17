export function initSidebar() {
      const menuToggle = document.getElementById('menu-toggle');
      const sidebar = document.querySelector('.sidebar');
      const mainContent = document.querySelector('.main-content');
      const header = document.querySelector('.header');
      const projekteLink = document.getElementById('projekte-link');
      const projekteSubNav = document.querySelector('#projekte-link + .sub-nav');

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

      projekteLink.addEventListener('click', (event) => {
        event.preventDefault();
        const isSubNavVisible = projekteSubNav.style.display !== 'none';

        if (isSubNavVisible) {
          projekteSubNav.style.display = 'none';
        } else {
          projekteSubNav.style.display = 'block';
        }
      });
    }
