PlayerClass = Class.create(EntityClass, {		//Heredamos de la clase entidad
	pos : {x:0,y:0},
	zindex: 70,
	currSpriteName: 'Cuadro2',

	update:function(){

		//Validamos si hay acciones pendientes por ejecutar
		if(gInputEngine.actions[MOV_IZQUIERDA]){
			this.pos.x = this.pos.x - 3;
		}
		if(gInputEngine.actions[MOV_DERECHA]){
			this.pos.x = this.pos.x + 3;
		}
		if(gInputEngine.actions[MOV_ARRIBA]){
			this.pos.y = this.pos.y - 3;
		}
		if(gInputEngine.actions[MOV_ABAJO]){
			this.pos.y = this.pos.y + 3;
		}

	},

	draw : function() { 
        pintarSprite(this.currSpriteName, this.pos.x, this.pos.y);
    }
});
