export function initPopup() {
      const popupOverlay = document.getElementById('popup-overlay');
    
      function openPopup(popup) {
        popup.style.display = 'block';
        popup.classList.add('active');
        popupOverlay.style.display = 'block';
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        adjustPopupSize(popup);
      }
    
      function closePopup(popup) {
        popup.classList.remove('active');
        popupOverlay.classList.remove('active');
        setTimeout(() => {
          popup.style.display = 'none';
          popupOverlay.style.display = 'none';
          document.body.style.overflow = '';
        }, 300);
      }
    
      function adjustPopupSize(popup) {
        const popupContent = popup.querySelector('.popup-content');
        popup.style.height = 'auto';
        popup.style.width = 'auto';
        popupContent.style.maxHeight = '80vh';
        popupContent.style.maxWidth = '90vw';
    
        const maxHeight = window.innerHeight * 0.9;
        const maxWidth = window.innerWidth * 0.9;
    
        if (popup.offsetHeight > maxHeight) {
          popup.style.height = `${maxHeight}px`;
          popupContent.style.maxHeight = `${maxHeight - 50}px`;
        }
    
        if (popup.offsetWidth > maxWidth) {
          popup.style.width = `${maxWidth}px`;
          popupContent.style.maxWidth = `${maxWidth - 50}px`;
        }
      }
    
      popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
          const activePopup = document.querySelector('.popup.active');
          if (activePopup) {
            closePopup(activePopup);
          }
        }
      });
    
      return { openPopup, closePopup };
    }
