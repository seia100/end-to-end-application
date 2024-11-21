import express from 'express';

const app = express();
const port = 3000;

// Configurar el motor de plantillas
app.set('view engine', 'ejs');

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Este es un app de Express',
        subtitle: 'usando EJS como plantilla',
        message: 'Hola Secure Health',
    });
});

app.get('/users/:id',(req,res)=>{
    const {originCity, destinationCity} = req.query;
    res.send(`Origin City: ${originCity}, Destination City: ${destinationCity}`)
})

// optional paremeters
app.get('/invoice/:id?',(req,res)=>{
    const id = parseInt(req.params.id);
    if(id) {
        res.send(`Invoice ${id} requested`);
    }else res.send('You are findind all invoices')
})

// expresiones regulares
app.get('/.*fly$/',(req,res)=> {
    res.send('Welcome to the future!')
})


// Iniciar el servidor
app.listen(port, () => {
    console.log(`App corriendo en http://localhost:${port}`);
});
