// proveedor.js

const API_URL = 'https://localhost:7028/api/Proveedores';

// Función para crear un nuevo proveedor
export async function crearProveedor(proveedorData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proveedorData),
        });
        const data = await response.json();
        console.log('Proveedor creado:', data);
        return data;
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        throw error;
    }
}

// Función para obtener todos los Proveedores
export async function obtenerProveedores() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Proveedor obtenido:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        throw error;
    }
}

export async function actualizarProveedor(proveedorId, proveedorActualizada) {
    try {
        const url = `https://localhost:7028/api/Proveedores/${proveedorId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proveedorActualizada),
        });
  
        // Verificar si la solicitud fue exitosa (código de estado 200-299)
        if (!response.ok) {
            throw new Error('Error al actualizar el proveedor');
        }
  
        // Si la solicitud fue exitosa, no necesitas analizar la respuesta JSON si no contiene datos
        // La función response.json() puede lanzar un error si la respuesta está vacía
        // Por lo tanto, puedes simplemente devolver null o cualquier otro valor apropiado
        return null; // O cualquier otro valor que desees devolver en caso de éxito
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        throw error; // Lanzar el error para que pueda ser manejado por el llamador
    }
}


// Función para eliminar un proveedor existente
export async function eliminarProveedor(proveedorId) {
    try {
        const url = `https://localhost:7028/api/Proveedores/${proveedorId}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el proveedor');
        }

        console.log('Proveedor eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el proveedor:', error);
        throw error;
    }
}