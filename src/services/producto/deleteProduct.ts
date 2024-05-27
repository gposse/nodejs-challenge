import { Producto } from '../../model';

// Función para eliminar un producto por su Id
async function deleteProductById(productId: number): Promise<void> {
    // Lógica para eliminar el producto con el Id dado
    // Por ejemplo, puedes buscar el producto en una base de datos y eliminarlo

    // Ejemplo de implementación:
    const productToDelete = await Producto.findOne({ where: { Id: productId } });

    if (productToDelete) {
        await productToDelete.destroy();
        console.log(`Producto Id ${productId} has been deleted.`);
    } else {
        console.log(`Producto with Id ${productId} not found.`);
    }
}

export default deleteProductById;
