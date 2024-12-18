export function initNavigation() {
      const homeLink = document.getElementById('home-link');
      // const notesLink = document.getElementById('notes-link'); // Remove this line
      const tasksLink = document.getElementById('tasks-link');
      const newProjectLink = document.getElementById('new-project-link');
      const projektdatenbankLink = document.getElementById('projektdatenbank-link');
      const neuerBenutzerLink = document.getElementById('neuer-benutzer-link');
      const benutzerdatenbankLink = document.getElementById('benutzerdatenbank-link');
      const neuesProtokollLink = document.getElementById('neues-protokoll-link');
      const protokolldatenbankLink = document.getElementById('protokolldatenbank-link');
      const neuerKontaktLink = document.getElementById('neuer-kontakt-link');
      const kontaktDatenbankLink = document.getElementById('kontakt-datenbank-link');
      const test1Link = document.getElementById('test1-link');
      const test2Link = document.getElementById('test2-link');
    
      homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/';
      });
    
      // Entferne den Event-Listener für den Notes-Link, da wir jetzt die :target-Pseudo-Klasse verwenden
    
      tasksLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/tasks.html';
      });
    
      newProjectLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/neues-projekt.html';
      });
    
      projektdatenbankLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/projektdatenbank.html';
      });
    
      neuerBenutzerLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/neuer-benutzer.html';
      });
    
      benutzerdatenbankLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/benutzerdatenbank.html';
      });
    
      neuesProtokollLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/neues-protokoll.html';
      });
    
      protokolldatenbankLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/protokolldatenbank.html';
      });
    
      neuerKontaktLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/neuer-kontakt.html';
      });
    
      kontaktDatenbankLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/kontakt-datenbank.html';
      });
    
      test1Link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/test1.html';
      });
    
      test2Link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/test2.html';
      });
    }
