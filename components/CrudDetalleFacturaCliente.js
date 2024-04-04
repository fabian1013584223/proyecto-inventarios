// FacturaClientejs

const API_URL = 'https://localhost:7284/api/detFacturasCliente';

// Resto del código de las funciones..


// Función para crear una nueva factura cliente
export async function crearDetalleFacturaCliente( nuevoDetalleFacturaCliente) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoDetalleFacturaCliente),
        });
        const data = await response.json();
        console.log('Factura cliente creado:', data);
        return data;
    } catch (error) {
        console.error('Error al crear detalle de factura cliente:', error);
        throw error;
    }
}

// Función para obtener todas las  Detalle facturas cliente
export async function obtenerDetalleFacturasCliente() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Detalle facturas cliente obtenidas:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener las detalle de facturas cliente:', error);
        throw error;
    }
}
// Función para actualizar una factura cliente existente
export async function actualizarDetalleFacturaCliente(DetFacturaClienteId, DetFacturaClienteActualizada) {
    try {
        const response = await fetch(`https://localhost:7028/api/detFacturasCliente/${DetFacturaClienteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(DetFacturaClienteActualizada),
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar la Detalle factura cliente');
        }
        
        console.log('Detalle factura cliente actualizada correctamente');
    } catch (error) {
        console.error('Error al actualizar la Detalle factura cliente:', error);
        throw error;
    }
}

// Función para eliminar una Detalle factura cliente existente
export async function eliminarDetalleFacturaCliente(DetalleFacturaClienteId) {
    try {
        const response = await fetch(`https://localhost:7028/api/detFacturasCliente/${DetalleFacturaClienteId}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar la Detalle factura cliente');
        }
        
        console.log('Detalle factura cliente eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar detalle factura cliente:', error);
        throw error;
       }
}