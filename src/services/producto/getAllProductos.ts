import { Fabrica, Producto } from '../../model';

async function getAllProducts(): Promise<Fabrica[]> {
    try {
        const fabricas = await Fabrica.findAll({
            include: [Producto]
        });
        return fabricas;
    } catch (error) {
        console.error('Error retrieving productos:', error);
        throw error;
    }
}

export default getAllProducts;