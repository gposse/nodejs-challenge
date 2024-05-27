import { Fabrica, Producto } from '../../model';

async function addProducto(producto: any): Promise<Producto> {
    if (!producto.Precio || !producto.Descripcion || !producto.Existencias) {
        throw new DOMException('Missing information');
    }
    if (!producto.IdFab || producto.IdFab === 0) {
        // Create a new record in the Fabrica table using the description of the product
        const fabrica = new Fabrica();
        fabrica.Descripcion = producto.Descripcion;
        // Save the new record in the Fabrica table
        try {
            await fabrica.save();
        } catch (error:any) {
            throw new Error('Failed to save record in the Fabrica table ('+error.message+")");
        }
        producto.IdFab = fabrica.Id;
    } else {
        // Check if the record exists in the Fabrica table
        const fabrica = await Fabrica.findOne({ where: { Id: producto.IdFab }});
        if (!fabrica) {
            throw new Error('The record does not exist in the Fabrica table');
        }
    }

    try {
        // Create the new record in the Producto table
        const savedProduct = new Producto();
        savedProduct.IdFab = producto.IdFab;
        savedProduct.Precio = producto.Precio;
        savedProduct.Descripcion = producto.Descripcion;
        savedProduct.Existencias = producto.Existencias;
        await savedProduct.save();
        return savedProduct;
    } catch (error:any) {
        throw new Error('Failed to save record in the Producto table ('+error.message+")");
    }
}

export default addProducto;
