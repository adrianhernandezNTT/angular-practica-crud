import { LitElement, html, css } from 'lit';
import '../breadcrumb/breadcrumb-component.js';
import '../table/table-component.js';

export class HomeComponent extends LitElement {
  render() {
    return html`
      <section>
        <h1>🏠 Home Page</h1>

        <!-- Breadcrumb -->
        <breadcrumb-component .items=${[
          { label: 'Home', url: '/' },
          { label: 'Tabla', url: '/tabla' }
        ]}></breadcrumb-component>

        <!-- Tabla -->
        <my-table></my-table>
      </section>
    `;
  }

  _onCreate() {
    alert('Ir a la vista de creación');
  }

  static styles = css`
    section {
      padding: 2rem;
      max-width: 1200px;
      margin: auto;
    }
    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }
    button {
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  `;
}

customElements.define('home-component', HomeComponent);
