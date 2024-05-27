import { LoginData, Usuario } from '../../model';
import bcrypt from 'bcryptjs';

async function registerUser(data: LoginData): Promise<Usuario> {
    if (!data.nombre || !data.contrasena) {
        throw new DOMException('Missing information');
    }
    // Check if the record exists in the Fabrica table
    const existingUser = await Usuario.findOne({ where: { Nombre: data.nombre }});
    if (existingUser) {
        throw new Error('User already exists');
    }

    try {
        // Create the new record in the Producto table
        const savedUser = new Usuario();
        savedUser.Nombre = data.nombre;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(data.contrasena, salt);

        savedUser.Salt = salt;
        savedUser.Contrasena = hash;
        await savedUser.save();
        return savedUser;
    } catch (error:any) {
        throw new Error('Failed to register user ('+error.message+")");
    }
}

export default registerUser;
