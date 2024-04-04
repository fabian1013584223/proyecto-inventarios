// Stock.js
const API_URL = 'https://localhost:7028/api/stocks';

// Función para crear una nueva categoría
export async function crearStock(cantidadReal) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cantidadReal),
    });
    const data = await response.json();
    console.log('Stock creado:', data);
    return data;
  } catch (error) {
    console.error('Error al crear cliente:', error);
    throw error;
  }
}

// Función para obtener todas las categorías
export async function obtenerStocks() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log('Stock obtenido:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener los Stock:', error);
    throw error;
  }
}

// Función para actualizar una categoría existente
export async function actualizarStock(stockId, StockActualizada) {
  try {
    const response = await fetch(`https://localhost:7028/api/stocks/${stockId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(StockActualizada),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar Stock');
    }
    console.log('Stock actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar Stock:', error);
    throw error;
  }
}

// Función para eliminar una categoría existente
export async function eliminarStock(stockId) {
  try {
    const response = await fetch(`https://localhost:7028/api/stocks/${stockId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar Stock');
    }
    console.log('Stock eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar Stock:', error);
    throw error;
  }
}