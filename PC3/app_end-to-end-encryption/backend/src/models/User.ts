import mongoose from 'mongoose'; // Importa la librería Mongoose para interactuar con MongoDB.

// Define el esquema de usuario.  El esquema define la estructura de 
// los documentos de usuario en la base de datos.
const userSchema = new mongoose.Schema({
    username: { 
        type: String, // El nombre de usuario es de tipo String.
        required: true, // El nombre de usuario es obligatorio.
        unique: true // El nombre de usuario debe ser único.
    },
    password: { 
        type: String, // La contraseña es de tipo String.
        required: true // La contraseña es obligatoria.
    },
    publicKey: { 
        type: String, // La clave pública es de tipo String.
        required: true // La clave pública es obligatoria.
    },
    privateKey: { 
        type: String, // La clave privada es de tipo String.
        required: true // La clave privada es obligatoria.
    },
}, {
    timestamps: true, // Agrega campos `createdAt` y `updatedAt` automáticamente a los documentos.  
    // Esto es útil para rastrear cuándo se crearon y modificaron los usuarios.
});

// Crea el modelo de usuario a partir del esquema.  
// El modelo se utiliza para interactuar con la colección de usuarios en la base de datos.
export default mongoose.model('User', userSchema);