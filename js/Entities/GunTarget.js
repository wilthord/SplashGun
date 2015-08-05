GunTargetClass = Class.create(EntityClass, {
	pos : {x:0,y:0},
	zindex: 70,
	currSpriteName: 'Cuadro1',

	update: function() {
		this.pos.x = gInputEngine.mouse.x;
		this.pos.y = gInputEngine.mouse.y;
	},

	draw : function() { 
        pintarSprite(this.currSpriteName, this.pos.x, this.pos.y);
    }

});