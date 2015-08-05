EntityClass = Class.create({
    
    pos : {x:0,y:0},
    size : {x:0,y:0},
    last : {x:0,y:0},
    currSpriteName : null,
    zindex: 0,                  //entero que indica en que orden se pintará la entidad

    // Metodos que deben ser sobrecargados por todas las clases hijas
    // Se ejecuta en cada tick, actualiza la entidad de acuerdo a sus acciones, IA o fisica
    update : function() { },

    //Pinta la entidad en la escena. es invocado por el GameEngine
    draw : function() { }
});