import { initPopup } from './popup.js';

    export function initKontakte() {
      const { openPopup, closePopup } = initPopup();
      const kontakteLink = document.getElementById('kontakte-link');
      const kontaktePopup = document.getElementById('kontakte-popup');
      const neuerKontaktBtn = document.getElementById('neuer-kontakt-btn');
      const kontaktDatenbankBtn = document.getElementById('kontakt-datenbank-btn');
      const neuerKontaktPopup = document.getElementById('neuer-kontakt-popup');
      const kontaktAbbrechenBtn = document.getElementById('kontakt-abbrechen-btn');
      const editKontaktPopup = document.getElementById('edit-kontakt-popup');
      const editKontaktAbbrechenBtn = document.getElementById('edit-kontakt-abbrechen-btn');
    
      kontakteLink.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup(kontaktePopup);
      });
    
      neuerKontaktBtn.addEventListener('click', () => {
        closePopup(kontaktePopup);
        openPopup(neuerKontaktPopup);
      });
    
      kontaktDatenbankBtn.addEventListener('click', () => {
        closePopup(kontaktePopup);
        window.location.href = '/kontakt-datenbank.html';
      });
    
      kontaktAbbrechenBtn.addEventListener('click', () => {
        closePopup(neuerKontaktPopup);
      });
    
      editKontaktAbbrechenBtn.addEventListener('click', () => {
        closePopup(editKontaktPopup);
      });
    }
