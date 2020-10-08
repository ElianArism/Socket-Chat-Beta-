// objeto que se encarga de buscar parametos en la url 
const Urlparams = new URLSearchParams(window.location.search); 
const usuarioParams = Urlparams.get('nombre'); 
const salaParams = Urlparams.get('sala'); 
const divUsuarios = document.getElementById('divUsuarios');
const formEnviar = document.querySelector('#form-enviar');
const divChat = document.querySelector('#divChatbox'); 

// Funciones para renderizar usuarios 
function renderizarUsuarios(personas) {
    let html = 
    `
        <li>
            <a href="javascript:void(0)" class="active"> Chat de <span> ${ Urlparams.get('sala') } </span></a>
        </li>
    `;

    for(let i = 0; i < personas.length; i++) { 
        html += `
            <li>
                <a data-id="${ personas[i].id }" id="user" href="javascript:void(0)" style="width: 100%; height:100%">
                    <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle">
                    <span> ${ personas[i].nombre }
                        <small class="text-success">online</small>
                    </span>
                </a>
            </li>
            `; 

        divUsuarios.innerHTML = html;
    }
}

divUsuarios.addEventListener('click', (e) => {
    if(e.target.id === 'user') {
        let id = e.target.getAttribute('data-id'); 
        if (id) console.log(id);
    }
}); 

formEnviar.addEventListener('submit', e => {
    e.preventDefault(); 
    const txtMsg = document.getElementById('txtMsg'); 

    if(txtMsg.length === 0 || txtMsg.value === "") return; 
    else { 
        socket.emit('crearMensaje', {
            usuario: usuarioParams,
            msg: txtMsg.value
        }, function(mensaje) {
            txtMsg.value = ''; 
            txtMsg.focus(); 
            renderizarMsg(mensaje, true); // Aca es el cliente local el que envia el mensaje
            
            scrollBottom();
        });
    }

});

function renderizarMsg(mensaje, yo) {
    const li = document.createElement('li'); 
    li.classList.add('animated', 'fadeIn'); 

    //formatear fecha
    let fecha = new Date(mensaje.fecha);
    hora = `${fecha.getHours() }:${fecha.getMinutes()}`; 

    let adminClass = 'info';
    if(mensaje.nombre === 'Administrador') {
        adminClass = 'danger'; 
    }
    let html = ''; 
    if(yo) {
        html = 
        ` 
            <li class="reverse">
                <div class="chat-content">
                    <h5>${ mensaje.nombre }</h5>
                    <div class="box bg-light-inverse">${ mensaje.mensaje }</div>
                </div>
                <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
                <div class="chat-time">${ hora }</div>
            </li>
        `;
    } else {
        html =
        `
            <div class="chat-img">
        `;
        if(mensaje.nombre !== 'Administrador') {
            html += `<img src="assets/images/users/1.jpg" alt="user" />`;      
        }

        html+=
        `</div>
            <div class="chat-content">
                <h5>${ mensaje.nombre }</h5>
                <div class="box bg-light-${adminClass}">${ mensaje.mensaje }</div>
            </div>
            <div class="chat-time">${ hora }</div>
        `; 
    }

    li.innerHTML = html;
    divChat.appendChild(li); 
}


function scrollBottom() {
    divChat.scrollTop = divChat.scrollHeight;

}


