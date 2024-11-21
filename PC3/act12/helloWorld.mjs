import express from 'express';

const app = express();
const port = 3000;

// Definimos una ruta para la ruta  raíz '/'
// y enviamos una respuesta con el texto ¡Hello worlds desde Express!
app.get('/',(req,res) => {
    res.send('Hello secureHealth from Express');
})

app.listen(port,()=>{
    console.log(`App Hello secureHealth listens from ${port} port.`)
})