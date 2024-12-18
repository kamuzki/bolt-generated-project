import { initThemeToggle } from './modules/themeToggle.js';
    import { initSidebar } from './modules/sidebar.js';
    import { initProjekte } from './modules/projekte.js';
    import { initProtokolle } from './modules/protokolle.js';
    import { initBenutzer } from './modules/benutzer.js';
    import { initKontakte } from './modules/kontakte.js';
    import { initNavigation } from './modules/navigation.js';
    import { initNotes } from './modules/notes.js';

    document.addEventListener('DOMContentLoaded', () => {
      initThemeToggle();
      initSidebar();
      initProjekte();
      initProtokolle();
      initBenutzer();
      initKontakte();
      initNavigation();
      initNotes();
    });
