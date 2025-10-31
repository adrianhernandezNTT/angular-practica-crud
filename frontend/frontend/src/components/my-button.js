import { LitElement, css, html } from 'lit';

export class MyButton extends LitElement {
  static properties = {
    variant: { type: String },  // 'primary', 'secondary', 'danger'
    disabled: { type: Boolean },
  };

  constructor() {
    super();
    this.variant = 'primary';
    this.disabled = false;
  }

  render() {
    return html`
      <button class=${this.variant} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }

  static styles = css`
    button {
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      padding: 0.6em 1.2em;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Variantes de botón */
    button.primary {
      background-color: #3b82f6;
      color: white;
    }

    button.primary:hover {
      background-color: #2563eb;
    }

    button.secondary {
      background-color: #f3f4f6;
      color: #1f2937;
      border: 1px solid #d1d5db;
    }

    button.secondary:hover {
      background-color: #e5e7eb;
    }

    button.danger {
      background-color: #ef4444;
      color: white;
    }

    button.danger:hover {
      background-color: #b91c1c;
    }
  `;
}

customElements.define('my-button', MyButton);
