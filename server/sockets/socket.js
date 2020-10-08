const { io } = require('../server');
const { Usuario } = require('../classes/usuarios'); 
const { crearMensaje } = require('../utils/utilidades');
const UserList = new Usuario(); 

io.on('connection', (client) => {
    client.on('entrarChat', (data, callback) => {
        if(!data.nombre || !data.sala) return callback({ok: false, msg: 'el nombre o la sala es invalida.'}); 
        // Enviar a un usuario a una sala
        client.join(data.sala)
        // Pinta un "x entro al chat" 
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } entro al chat.`)); 
        // almaceno lo que retorna la funcion *client.id corresponde al id del socket 
        UserList.agregarPersona(client.id, data.nombre, data.sala); 
        // Enviar mensaje solo a usuarios en la misma sala 
        client.broadcast.to(data.sala).emit('listaPersona', UserList.getPersonasxSala(data.sala)); 
        callback(UserList.getPersonasxSala(data.sala));
    }); 

    client.on('disconnect', () => {
        let personaBorrada = UserList.borrarPersona(client.id); 
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', ` ${ personaBorrada.nombre } abandono el chat.`)); 
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', UserList.getPersonasxSala(personaBorrada.sala))}
    ); 

    client.on('crearMensaje', (data, callback) => {
        let persona = UserList.getPersona(client.id); 
        let mensaje = crearMensaje( persona.nombre, data.msg ); 
        // Enviar mensaje solo a usuarios en la misma sala 
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje); 
    }); 

    client.on('mensajePrivado', data => {
        let persona = UserList.getPersona(client.id); 
        client.broadcast.to(data.idReceptor).emit('mensajePrivado', crearMensaje( persona.nombre, data.msg ));  
    });  


});