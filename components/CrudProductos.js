// Stock.js
const API_URL = 'https://localhost:7028/api/Productos';

// Función para crear una nueva categoría
export async function crearProductos(nombre) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nombre),
    });
    const data = await response.json();
    console.log('Producto creado:', data);
    return data;
  } catch (error) {
    console.error('Error al crear Producto:', error);
    throw error;
  }
}

// Función para obtener todas las categorías
export async function obtenerProductos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log('Producto obtenido:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener los Productos:', error);
    throw error;
  }
}

// Función para actualizar un Producto existente
export async function actualizarProductos(productoId, ProductoActualizada) {
  try {
    const response = await fetch(`https://localhost:7028/api/Productos/${productoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ProductoActualizada),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar Producto');
    }
    console.log('Producto actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar Producto:', error);
    throw error;
  }
}

// Función para eliminar una categoría existente
export async function eliminarProductos(productoId) {
  try {
    const response = await fetch(`https://localhost:7028/api/Productos/${productoId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar Producto');
    }
    console.log('Producto eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar Producto:', error);
    throw error;
  }
}