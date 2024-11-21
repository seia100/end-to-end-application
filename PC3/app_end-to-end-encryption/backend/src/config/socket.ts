import { Server } from 'socket.io'; // Importa la clase Server de Socket.IO.
import { Server as HTTPServer } from 'http'; // Importa la clase Server de HTTP.

// Configura Socket.IO.  Esta función recibe el servidor HTTP como parámetro 
// y configura Socket.IO para la comunicación en tiempo real.
export const configureSocket = (server: HTTPServer) => {
    // Crea una nueva instancia de Socket.IO, pasando el servidor HTTP 
    // y las opciones de configuración.
    const io = new Server(server, {
        cors: {
            origin: '*', // Permite conexiones desde cualquier origen.  
            // **IMPORTANTE:** 
            //En producción, restringe el origen a los dominios permitidos para mayor seguridad.
        },
    });

    // Escucha el evento 'connection'.  Este evento se emite cuando un nuevo cliente 
    // se conecta al servidor.
    io.on('connection', (socket) => {
        // Imprime un mensaje en la consola indicando que un nuevo 
        // cliente se ha conectado.
        console.log(`Nuevo cliente conectado: ${socket.id}`);

        // Escucha el evento 'send_message'.  Este evento se emite cuando un 
        // cliente envía un mensaje.
        socket.on('send_message', (data) => {
            // Imprime el mensaje en la consola.
            console.log('Mensaje enviado:', data);

            // Emite el evento 'receive_message' al destinatario del mensaje.  
            // `data.receiver` debe contener el ID del socket del destinatario.
            io.to(data.receiver).emit('receive_message', data);
        });

        // Escucha el evento 'disconnect'.  Este evento se emite cuando un 
        // cliente se desconecta del servidor.
        socket.on('disconnect', () => {
            // Imprime un mensaje en la consola indicando que un cliente 
            // se ha desconectado.
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
};