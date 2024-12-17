import { initPopup } from './popup.js';

    export function initProtokolle() {
      const { openPopup, closePopup } = initPopup();
      const protokolleLink = document.getElementById('protokolle-link');
      const protokollePopup = document.getElementById('protokolle-popup');
      const neuesProtokollBtn = document.getElementById('neues-protokoll-btn');
      const protokolldatenbankBtn = document.getElementById('protokolldatenbank-btn');
      const neuesProtokollPopup = document.getElementById('neues-protokoll-popup');
      const protokollAbbrechenBtn = document.getElementById('protokoll-abbrechen-btn');

      protokolleLink.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup(protokollePopup);
      });

      neuesProtokollBtn.addEventListener('click', () => {
        closePopup(protokollePopup);
        openPopup(neuesProtokollPopup);
      });

      protokolldatenbankBtn.addEventListener('click', () => {
        closePopup(protokollePopup);
        window.location.href = '/protokolldatenbank.html';
      });

      protokollAbbrechenBtn.addEventListener('click', () => {
        closePopup(neuesProtokollPopup);
      });
    }
