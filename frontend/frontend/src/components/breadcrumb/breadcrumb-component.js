import { LitElement, html, css } from 'lit';

export class BreadcrumbComponent extends LitElement {
  static properties = {
    items: { type: Array } //recibir un array de objetos { label, url }
  };

  constructor() {
    super();
    this.items = [];
  }

  render() {
    return html`
      <nav class="breadcrumb">
        ${this.items.map((item, index) => html`
          <a href="${item.url}">${item.label}</a>
          ${index < this.items.length - 1 ? html`<span class="divider">/</span>` : ''}
        `)}
      </nav>
    `;
  }

  static styles = css`
    .breadcrumb {
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    a {
      text-decoration: none;
      color: #2563eb;
    }
    a:hover {
      text-decoration: underline;
    }
    .divider {
      margin: 0 0.3rem;
      color: #888;
    }
  `;
}

customElements.define('breadcrumb-component', BreadcrumbComponent);
