import { Router } from 'express';
import { register, login } from '../controllers/authController';

// Crear una instancia del enrutador de Express.
// Estrategia:  Usar Router() para definir las rutas relacionadas con la autenticación.
const router = Router();

// Definir la ruta para el registro de usuarios.
// Estrategia:  Usar router.post para manejar las solicitudes POST a /register.
// Se llama a la función register del controlador authController.
router.post('/register', register);


// Definir la ruta para el inicio de sesión.
// Estrategia:  Usar router.post para manejar las solicitudes POST a /login.
// Se llama a la función login del controlador authController.
router.post('/login', login);

// Exportar el enrutador.
export default router;