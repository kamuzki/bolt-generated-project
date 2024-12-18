export function initSidebar() {
      const navList = document.querySelector('.sidebar nav ul');
      
      // Event Delegation für alle Klick-Events innerhalb der Navigation
      navList.addEventListener('click', (event) => {
        const clickedElement = event.target;
    
        // Überprüfen, ob ein Hauptmenü-Link geklickt wurde
        if (clickedElement.tagName === 'A' && clickedElement.parentNode.classList.contains('main-nav-item')) {
          event.preventDefault();
          console.log('Main nav item clicked:', clickedElement.textContent);
    
          const navItem = clickedElement.parentNode;
          const subNav = navItem.querySelector('.sub-nav');
    
          // Schließen aller anderen Submenüs
          const navItems = document.querySelectorAll('.main-nav-item');
          navItems.forEach(otherNavItem => {
            if (otherNavItem !== navItem) {
              const otherSubNav = otherNavItem.querySelector('.sub-nav');
              if (otherSubNav) {
                otherSubNav.style.display = 'none';
                console.log('Closing other submenu:', otherNavItem.querySelector('a').textContent);
              }
            }
          });
    
          // Toggle des aktuellen Submenüs
          if (subNav) {
            const isSubNavVisible = subNav.style.display !== 'none';
            subNav.style.display = isSubNavVisible ? 'none' : 'block';
            console.log('Toggling submenu:', clickedElement.textContent, 'New state:', subNav.style.display);
          }
        }
    
        // Überprüfen, ob ein Submenü-Link geklickt wurde
        if (clickedElement.tagName === 'A' && clickedElement.parentNode.parentNode.classList.contains('sub-nav')) {
          event.stopPropagation();
          console.log('Submenu item clicked:', clickedElement.textContent, 'Navigating to:', clickedElement.href);
    
          // Überprüfen, ob es sich um den "Notes"-Link handelt
          if (clickedElement.id === 'notes-link') {
            event.preventDefault(); // Verhindert die Standardaktion des Links
            console.log('Notes link clicked');
            // Hier wird die Logik zum Öffnen des Notes-Popups aufgerufen
            // Diese Logik ist jetzt in initNotes in notes.js
          } else {
            window.location.href = clickedElement.href; // Navigation zu anderen Links
          }
        }
      });
    }
