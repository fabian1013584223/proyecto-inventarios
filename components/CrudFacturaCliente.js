// FacturaCliente.js

const API_URL = 'https://localhost:7284/api/facturasCliente';

// Resto del código de las funciones..


// Función para crear una nueva categoría
export async function crearFacturaCliente(nuevaFacturaCliente) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaFacturaCliente),
        });
        const data = await response.json();
        console.log('factura Cliente creada:', data);
        return data;
    } catch (error) {
        console.error('Error al crear la factura Cliente:', error);
        throw error;
    }
}

// Función para obtener todas las categorías
export async function obtenerFacturasCliente() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('facturas Cliente obtenidas:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener las facturas Cliente:', error);
        throw error;
    }
}
// Función para actualizar una categoría existente
export async function actualizarFacturaCliente(facturaClienteId, facturaClienteActualizada) {
    try {
        const response = await fetch(`https://localhost:7284/api/facturasCliente/${facturaClienteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(facturaClienteActualizada),
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar la factura Cliente');
        }
        
        console.log('Factura Cliente actualizada correctamente');
    } catch (error) {
        console.error('Error al actualizar la factura Cliente:', error);
        throw error;
    }
}



// Función para eliminar una categoría existente
export async function eliminarFacturaCliente(facturaClienteId) {
    try {
        const response = await fetch(`https://localhost:7284/api/facturasCliente/${facturaClienteId}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar la factura Cliente');
        }
        
        console.log('Factura Cliente eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la factura Cliente:', error);
        throw error;
    }
}