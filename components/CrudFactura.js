// categorias.js

const API_URL = 'https://localhost:7028/api/facturasProveedor';

// Resto del código de las funciones..


// Función para crear una nueva categoría
export async function crearFacturaProveedor(FacturaData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(FacturaData),
        });
        const data = await response.json();
        console.log('factura creada:', data);
        return data;
    } catch (error) {
        console.error('Error al crear la factura:', error);
        throw error;
    }
}

// Función para obtener todas las categorías
export async function obtenerFacturasProveedor() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('facturas obtenidas:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener las facturas:', error);
        throw error;
    }
}

// Función para actualizar una categoría existente
export async function actualizarFacturaProveedor(facturaProveedorId, facturaActualizada) {
    try {
        const response = await fetch(`https://localhost:7284/api/facturasProveedor/${facturaProveedorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(facturaActualizada),
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar la factura');
        }
        
        console.log('Factura actualizada correctamente');
    } catch (error) {
        console.error('Error al actualizar la factura:', error);
        throw error;
    }
}
// Función para eliminar una categoría existente
export async function eliminarFacturaProveedor(facturaProveedorId) {
    try {
        const url = (`https://localhost:7284/api/facturasProveedor/${facturaProveedorId}`);
            const response = await fetch(url, {
                method: 'DELETE',
            });
        
        if (!response.ok) {
            throw new Error('Error al eliminar la factura');
        }
        
        console.log('Factura eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la factura:', error);
        throw error;
    }
}

