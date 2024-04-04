// categorias.js

const API_URL = 'https://localhost:7028/api/categorias';

export async function crearCategoria(categoriaData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoriaData),
        });
        const data = await response.json();
        console.log('Categoria creada:', data);
        return data;
    } catch (error) {
        console.error('Error al crear la categoria:', error);
        throw error;
    }
}
export async function obtenerCategorias() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Categorías obtenidas:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
}
export async function actualizarCategoria(categoriaId, categoriaActualizada) {
    try {
        const response = await fetch(`https://localhost:7028/api/categorias/${categoriaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoriaActualizada),
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar la categoría');
        }
        
        console.log('Categoría actualizada correctamente');
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        throw error;
    }
}

export async function eliminarCategoria(categoriaId) {
    try {
        const url = (`https://localhost:7028/api/categorias/${categoriaId}`); 
        const response = await fetch(url, {
            method: 'DELETE',
        });
        
        
        if (!response.ok) {
            throw new Error('Error al eliminar la categoría');
        }
        
        console.log('Categoría eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        throw error;
    }
}