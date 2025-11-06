import { LitElement, css, html } from 'lit';
import './components/my-button.js';
import './components/home/home-component.js';
import './components/table/table-component.js';

export class MyElement extends LitElement {
  static properties = {
    darkMode: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  render() {
    return html`
      <header>
        <h1>🌐 CRUD Demo</h1>
        <button class="theme-toggle" @click=${this.toggleTheme}>
          ${this.darkMode ? '☀️ Modo claro' : '🌙 Modo oscuro'}
        </button>
      </header>

      <main>
        <section class="content">
          <!-- Componente Home que contiene la tabla y modal -->
          <home-component></home-component>

          <!-- Botones reutilizables -->
          <div class="buttons">
            <my-button variant="primary">Guardar</my-button>
            <my-button variant="secondary">Cancelar</my-button>
            <my-button variant="danger" ?disabled=${true}>Eliminar</my-button>
          </div>
        </section>
      </main>

      <footer>
        <p>Hecho por <strong>Adrián Hernández</strong> | NTT DATA</p>
      </footer>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      color-scheme: light dark;
      font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
      transition: background-color 0.3s ease, color 0.3s ease;
      background: var(--bg);
      color: var(--text);
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: var(--header-bg);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    header h1 {
      margin: 0;
      font-size: 1.5rem;
      letter-spacing: 0.5px;
    }

    .buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
    }

    .theme-toggle {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: none;
      background: var(--button-bg);
      color: var(--button-text);
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .theme-toggle:hover {
      transform: scale(1.05);
      opacity: 0.9;
    }

    main {
      flex: 1;
      padding: 3rem 2rem;
      display: block; /* Cambiado de flex a block para que home-component no se centre extra */
    }

    .content {
      max-width: 900px;
      margin: 0 auto; /* centramos horizontalmente sin afectar vertical */
      text-align: center;
    }

    footer {
      text-align: center;
      padding: 1rem;
      font-size: 0.9rem;
      color: var(--footer-text);
      border-top: 1px solid var(--border);
      background: var(--footer-bg);
    }

    /* Modo claro */
    :host(:not([darkMode])) {
      --bg: #f9fafb;
      --text: #1f2937;
      --header-bg: #ffffff;
      --button-bg: #2563eb;
      --button-text: #ffffff;
      --border: #e5e7eb;
      --card-bg: #ffffff;
      --footer-bg: #f3f4f6;
      --footer-text: #4b5563;
    }

    /* Modo oscuro */
    :host([darkMode]) {
      --bg: #18181b;
      --text: #e4e4e7;
      --header-bg: #27272a;
      --button-bg: #3b82f6;
      --button-text: #ffffff;
      --border: #3f3f46;
      --card-bg: #1f1f22;
      --footer-bg: #27272a;
      --footer-text: #a1a1aa;
    }

    @media (max-width: 768px) {
      header {
        flex-direction: column;
        gap: 0.5rem;
      }

      main {
        padding: 2rem 1rem;
      }
    }
  `;
}

customElements.define('my-element', MyElement);
