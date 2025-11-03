// frontend/frontend/src/services/brands-service.js

const API_URL = 'http://localhost:3000';

export class BrandsService {
  static get token() {
    return localStorage.getItem('auth-token');
  }

  static get headers() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    };
  }

  static async getBrands() {
    const response = await fetch(`${API_URL}/brands`, { headers: this.headers });
    if (!response.ok) throw new Error('Error al obtener las marcas');
    return response.json();
  }

  static async getModelsByBrand(brandId) {
    const response = await fetch(`${API_URL}/brands/${brandId}/models`, { headers: this.headers });
    if (!response.ok) throw new Error('Error al obtener los modelos');
    return response.json();
  }
}
