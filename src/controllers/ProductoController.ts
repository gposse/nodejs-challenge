import { Fabrica, Producto } from '../model';

import addProducto from '../services/producto/addProducto';
import deleteProductById from '../services/producto/deleteProduct';
import getAllProducts from '../services/producto/getAllProductos';

export default class ProductoController {
    public async add(datosProducto:any): Promise<Producto> {
      const savedProduct = await addProducto(datosProducto);
      return savedProduct;
    }

    public async delete(id: number): Promise<void> {
      await deleteProductById(id);
    }

    public async getAll(): Promise<Fabrica[]> {
      const fabricas = await getAllProducts();
      return fabricas;
    }
}

export { Fabrica, Producto }
