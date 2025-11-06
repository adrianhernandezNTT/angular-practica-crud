import { LitElement, html, css } from 'lit';
import '../breadcrumb/breadcrumb-component.js';
import { CarsService } from '../../services/cars-service.js';
import { BrandsService } from '../../services/brands-service.js';

export class TableComponent extends LitElement {
  static properties = {
    data: { type: Array },
    brands: { type: Array },
    models: { type: Array },
    showCreate: { type: Boolean },
    newCar: { type: Object }
  };

  constructor() {
    super();
    this.data = [];
    this.brands = [];
    this.models = [];
    this.showCreate = false;
    this.newCar = { brand: '', model: '', total: 0 };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadBrands();
    await this.loadCars();
  }

  async loadBrands() {
    try {
      const brands = await BrandsService.getBrands();
      this.brands = brands.map(b => ({ id: b.id, name: b.name || b.brand }));
    } catch (error) {
      console.error(error);
      alert('❌ Error cargando marcas');
    }
  }

  async loadCars() {
    try {
      const cars = await CarsService.getCars();
      const brandMap = {};
      const modelMap = {};
      
      for (const brand of this.brands) {
        brandMap[brand.id] = brand.name;
        const models = await BrandsService.getModelsByBrand(brand.id);
        models.forEach(m => modelMap[m.id] = m.name || m.model);
      }

      this.data = cars.map(c => ({
        ...c,
        marca: brandMap[c.brand] || c.brand,
        modelo: modelMap[c.model] || c.model
      }));
    } catch (error) {
      console.error(error);
      alert('❌ Error cargando coches');
    }
  }

  _onCreateClick() {
  this.newCar = { brand: '', model: '', total: 0 };
  this.models = [];
  this.showCreate = true; // simplemente activamos showCreate
}



  async _onBrandChange(e) {
  const brandId = e.target.value;
  this.newCar.brand = brandId;

  if (!brandId) {
    this.models = [];
    this.newCar.model = '';
    return;
  }

  try {
    const models = await BrandsService.getModelsByBrand(brandId);
    // Garantizamos que cada modelo tenga un name
    this.models = models.map(m => ({ id: m.id, name: m.name || m.model || 'Sin nombre' }));
    this.newCar.model = '';
  } catch (error) {
    console.error(error);
    this.models = [];
  }
}



  _onModelChange(e) {
    this.newCar.model = e.target.value;
  }

  _onTotalChange(e) {
    this.newCar.total = parseInt(e.target.value, 10);
  }

  async _onSave() {
  if (!this.newCar.brand || !this.newCar.model || isNaN(this.newCar.total)) {
    alert('❌ Completa todos los campos correctamente');
    return;
  }

  try {
    const savedCar = await CarsService.createCar(this.newCar);
    const brandName = this.brands.find(b => b.id === savedCar.brand)?.name || savedCar.brand;
    const modelName = this.models.find(m => m.id === savedCar.model)?.name || savedCar.model;
    this.data = [...this.data, { ...savedCar, marca: brandName, modelo: modelName }];
    this.showCreate = false;
  } catch (error) {
    console.error(error);
    alert('❌ Error al crear coche');
  }
}


  _onCancel() {
    this.showCreate = false;
  }

  async _onEdit(id) { /* lógica de editar */ }
  async _onDelete(id) { /* lógica de eliminar */ }

  render() {
    return html`
      <breadcrumb-component url="/" label="Home"></breadcrumb-component>
      <button @click=${this._onCreateClick}>➕ Crear</button>

      ${!this.showCreate ? html`
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${this.data.length
              ? this.data.map((row, i) => html`
                <tr>
                  <td>${i+1}</td>
                  <td>${row.marca}</td>
                  <td>${row.modelo}</td>
                  <td>${row.total}</td>
                  <td>
                    <button @click=${() => this._onEdit(row.id)}>Editar</button>
                    <button @click=${() => this._onDelete(row.id)}>Eliminar</button>
                  </td>
                </tr>
              `)
              : html`<tr><td colspan="5">No hay datos disponibles</td></tr>`
            }
          </tbody>
        </table>
      ` : ''}

      ${this.showCreate ? html`
        <div class="modal">
          <div class="modal-content">
            <h3>Crear coche</h3>
            <label>Marca:
              <select @change=${this._onBrandChange}>
                <option value="">--Selecciona--</option>
                ${this.brands.map(b => html`<option value=${b.id}>${b.name}</option>`)}
              </select>
            </label>
            <label>Modelo:
              <select @change=${this._onModelChange}>
                  <option value="">--Selecciona--</option>
                      ${this.models.map(m => html`<option value=${m.id}>${m.name}</option>`)}
              </select>
            </label>

            <label>Total:
              <input type="number" min="0" @input=${this._onTotalChange} .value=${this.newCar.total || ''}/>
            </label>
            <div class="modal-actions">
              <button @click=${this._onSave}>Guardar</button>
              <button @click=${this._onCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }

  static styles = css`
    :host { display: block; margin-top: 1rem; font-family: system-ui, sans-serif; }
    button { margin:0 0.25rem; padding:0.25rem 0.5rem; border-radius:6px; border:1px solid transparent; background-color:#3b82f6; color:#fff; cursor:pointer; }
    button:hover { opacity:0.9; }
    table { width:100%; border-collapse: collapse; margin-top:1rem; }
    th, td { padding:0.5rem 1rem; border:1px solid #ccc; text-align:center; }
    th { background:#f0f0f0; font-weight:600; }
    .modal { position: fixed; top:0; left:0; right:0; bottom:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.5); z-index:1000; }
    .modal-content { background:#fff; padding:1rem; border-radius:8px; display:flex; flex-direction:column; gap:0.5rem; min-width:300px; }
    .modal-actions { display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem; }
    label { display:flex; flex-direction:column; font-weight:600; gap:0.25rem; }
    select, input { padding:0.25rem; font-size:1rem; }
  `;
}

customElements.define('my-table', TableComponent);
