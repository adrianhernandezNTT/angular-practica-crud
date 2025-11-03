// frontend/frontend/src/services/cars-service.js

const API_URL = 'http://localhost:3000'; // Ajusta el puerto si tu backend usa otro

export class CarsService {
  static get token() {
    return localStorage.getItem('auth-token');
  }

  static get headers() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    };
  }

  static async getCars() {
    const response = await fetch(`${API_URL}/cars`, { headers: this.headers });
    if (!response.ok) throw new Error('Error al obtener los coches');
    return response.json();
  }

  static async getCarById(id) {
    const response = await fetch(`${API_URL}/cars/${id}`, { headers: this.headers });
    if (!response.ok) throw new Error('Error al obtener el coche');
    return response.json();
  }

  static async createCar(car) {
    const response = await fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(car),
    });
    if (!response.ok) throw new Error('Error al crear el coche');
    return response.json();
  }

  static async updateCar(id, car) {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(car),
    });
    if (!response.ok) throw new Error('Error al actualizar el coche');
    return response.json();
  }

  static async deleteCar(id) {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    if (!response.ok) throw new Error('Error al eliminar el coche');
    return response.json();
  }
}
