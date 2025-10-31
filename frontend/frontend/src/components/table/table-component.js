import { LitElement, html, css } from 'lit';

export class TableComponent extends LitElement {
  static properties = { data: { type: Array } };

  constructor() {
    super();
    this.data = [
      { id: 1, marca: 'Ford', modelo: 'Fiesta', total: 100 },
      { id: 2, marca: 'Toyota', modelo: 'Corolla', total: 200 },
    ];
  }

  render() {
    return html`
      <button @click=${this._onCreate}>➕ Crear</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map(row => html`
            <tr>
              <td><a href="/detalle/${row.id}">${row.id}</a></td>
              <td>${row.marca}</td>
              <td>${row.modelo}</td>
              <td>${row.total}</td>
              <td>
                <button @click=${() => this._onEdit(row.id)}>Editar</button>
                <button @click=${() => this._onDelete(row.id)}>Eliminar</button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  _onCreate() { alert('Ir a la vista de creación'); }
  _onEdit(id) { alert(`Editar registro con ID ${id}`); }
  _onDelete(id) {
    if(confirm(`¿Eliminar registro ${id}?`)) this.data = this.data.filter(i => i.id !== id);
  }

  static styles = css`
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { padding: 0.5rem 1rem; border: 1px solid #ccc; text-align: center; }
    th { background-color: #f0f0f0; }
    button { margin: 0 0.25rem; padding: 0.25rem 0.5rem; cursor: pointer; }
  `;
}

customElements.define('my-table', TableComponent);
