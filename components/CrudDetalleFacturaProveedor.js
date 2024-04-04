//  DetFacturaProveedorjs

const API_URL = 'https://localhost:7284/api/detFacturasProveedor';
// Función para crear una nueva categoría
export async function crearDetalleFacturaProveedor(cantidadReal) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cantidadReal),
    });
    const data = await response.json();
    console.log('Detalle Factura Proveedor creado:', data);
    return data;
  } catch (error) {
    console.error('Error al crear Detalle Factura Proveedor:', error);
    throw error;
  }
}

// Función para obtener todas las categorías
export async function obtenerDetalleFacturaProveedor() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log('Detalle Factura Proveedor obtenido:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener los Detalles Factura Proveedor:', error);
    throw error;
  }
}

// Función para actualizar una categoría existente
export async function actualizarDetalleFacturaProveedor(detalleId, DetalleFacturaProveedorActualizada) {
  try {
    const response = await fetch(`https://localhost:7284/api/detFacturasProveedor/${detalleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(DetalleFacturaProveedorActualizada),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar Detalle Factura Proveedor');
    }
    console.log('Detalle Factura Proveedor actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar Detalle Factura Proveedor:', error);
    throw error;
  }
}

// Función para eliminar una categoría existente
export async function eliminarDetalleFacturaProveedor(detalleId) {
  try {
    const response = await fetch(`https://localhost:7284/api/detFacturasProveedor/${detalleId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar Detalle Factura Proveedor');
    }
    console.log('Detalle Factura Proveedor eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar Detalle Factura Proveedor:', error);
    throw error;
  }
}