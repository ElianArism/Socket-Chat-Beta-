class Usuario {

    constructor() {
        this.personas = []; 
    }

    agregarPersona(id, nombre, sala) {
        let persona = {id, nombre, sala}; 
        this.personas.push(persona); 

        // return this.personas; 
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => {
            return persona.id === id;  
        // Filter regresa un arreglo, por lo que es necesario especificar en este caso que retorne solo la primera posicion 
        })[0]; 
        return persona; 
    }

    get Personas() {
        return this.personas; 
    }
    
    getPersonasxSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala); 
        return personasEnSala;

    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        console.log(this.personas);
        console.log(personaBorrada);
        return personaBorrada; 
    }

}

module.exports = { Usuario };