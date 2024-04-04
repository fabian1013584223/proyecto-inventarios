// categorias.js

const API_URL = 'https://localhost:7028/api/clientes';

// Resto del código de las funciones..


// Función para crear una nueva categoría
export async function crearCliente(clienteData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
        });
        const data = await response.json();
        console.log('Cliente creado:', data);
        return data;
    } catch (error) {
        console.error('Error al crear cliente:', error);
        throw error;
    }
}

// Función para obtener todas las categorías
export async function obtenerClientes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Clientes obtenidas:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        throw error;
    }
}
export async function actualizarCliente(idCliente, clienteActualizado) {
    try {
        const response = await fetch(`https://localhost:7028/api/clientes/${idCliente}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteActualizado),
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar el cliente');
        }
        
        console.log('Cliente actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        throw error;
    }
}

export async function eliminarCliente(idCliente) {
    try {
        const url = (`https://localhost:7028/api/clientes/${idCliente}`); 
        const response = await fetch(url, {
            method: 'DELETE',
        });
        
        
        if (!response.ok) {
            throw new Error('Error al eliminar el cliente');
        }
        
        console.log('Cliente eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        throw error;
    }
}