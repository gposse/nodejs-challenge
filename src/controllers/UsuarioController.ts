import { Usuario } from '../model';

import loginUser from '../services/usuario/loginUser';
import registerUser from '../services/usuario/registerUser';

export default class UsuarioController {
    public async login(datosUsuario:any): Promise<boolean> {
      const authorized = await loginUser(datosUsuario);
      return authorized;
    }

    public async register(datosUsuario:any): Promise<Usuario> {
      const savedUser = await registerUser(datosUsuario);
      return savedUser;
    }

}

