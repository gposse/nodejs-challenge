import bcrypt from 'bcryptjs';
import { LoginData, Usuario } from '../../model';

async function loginUser(data: LoginData): Promise<boolean> {
    try {
        // Find the user by name in the Usuario model
        const user = await Usuario.findOne({ where: { nombre: data.nombre }});

        if (!user) {
            // User not found
            return false;
        }

        const hash = await bcrypt.hash(data.contrasena, user.Salt);

        const isPasswordValid = hash.localeCompare(user.Contrasena) === 0;

        if (!isPasswordValid) {
            // Password is incorrect
            return false;
        }

        // Password is correct
        return true;
    } catch (error) {
        // Handle any errors that occur during the login process
        console.error('An error occurred during login:', error);
        throw error;
    }
}

export default loginUser;
