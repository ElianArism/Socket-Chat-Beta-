let socket = io();
let params = new URLSearchParams(window.location.search); 

if(!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'; // redirecciona
    throw new Error('El nombre y la sala son necesarios.');  //lanza una excepcion 
}  // else
let usuario = { 
    nombre: params.get('nombre'),
    sala: params.get('sala')
}; 


socket.on('connect', function() {
    console.log('Conectado al servidor');
   
    socket.emit('entrarChat', usuario , res => {
        // console.log('Usuarios conectados: ', res);        
        // pintar usuarios en el html
        renderizarUsuarios(res); 
    });
});

socket.on('crearMensaje', (res) => {
    renderizarMsg(res, false); //Aca es el mensaje que envian desde fuera 
}); 

// cuando un usuario entra o sale del chat 
socket.on('listaPersona', (res) => {
    console.log('Estan en el chat, ', res);
}); 

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');

});


// EMITS 

// Enviar información

// Mensajes privados 
socket.on('mensajePrivado', res => {
    console.log('Mensaje privado: ', res); 
});  