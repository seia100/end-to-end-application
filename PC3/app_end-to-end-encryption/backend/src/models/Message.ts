// Message.ts

import mongoose from 'mongoose'; // Importa Mongoose.

// Define el esquema de mensaje.
const messageSchema = new mongoose.Schema({
    
    sender: { 
        type: mongoose.Schema.Types.ObjectId, // El remitente es un ObjectId que referencia al modelo User.
        ref: 'User', // Referencia al modelo User.
        required: true // El remitente es obligatorio.
    },

    receiver: { 
        // El destinatario es un ObjectId que referencia al modelo User.
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Referencia al modelo User.
        required: true // El destinatario es obligatorio.
    },
    
    content: { 
        type: String, // El contenido del mensaje es un String (cifrado).
        required: true // El contenido es obligatorio.
    },
}, {
    timestamps: true, // Agrega timestamps automáticamente.
});

// Crea el modelo de mensaje a partir del esquema.
export default mongoose.model('Message', messageSchema);