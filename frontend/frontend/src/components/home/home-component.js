import { LitElement, html, css } from 'lit';
import '../table/table-component.js';

export class HomeComponent extends LitElement {
  render() {
    return html`
      <section>
        <h1>🏠 Home Page</h1>
        <my-table></my-table>
      </section>
    `;
  }

  static styles = css`
    section {
      padding: 2rem;
      max-width: 1200px;
      margin: auto;
    }

    h1 {
      text-align: center;
      margin-bottom: 2rem;
    }
  `;
}

customElements.define('home-component', HomeComponent);
