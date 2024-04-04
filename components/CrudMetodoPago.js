
const API_URL = 'https://localhost:7028/api/metodoPagos';

// Resto del código de las funciones..


// Función para crear una nueva categoría
export async function crearMetodo(nuevoMetodo) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoMetodo),
        });
        const data = await response.json();
        console.log('Metodo creado:', data);
        return data;
    } catch (error) {
        console.error('Error al crear el metodo:', error);
        throw error;
    }
}

// Función para obtener todas las categorías
export async function obtenerMetodos() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('metodos obtenidos:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener metodos:', error);
        throw error;
    }
}
// Función para actualizar una categoría existente
export async function actualizarMetodo(fechadepago, metodoActualizado) {
    try {
        const response = await fetch(`https://localhost:7284/api/metodoPagos/${fechadepago}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(metodoActualizado),
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar metodo');
        }
        
        console.log('metodo actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar el metodo:', error);
        throw error;
    }
}



// Función para eliminar una categoría existente
export async function eliminarMetodo(fechadepago) {
    try {
        const response = await fetch(`https://localhost:7284/api/metodoPagos/${fechadepago}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar metodo');
        }
        
        console.log('Metodo eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar metodo:', error);
        throw error;
    }
}

