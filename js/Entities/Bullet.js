BulletClass = Class.create({
	pos:{x:0, y:0},
	inicio:{x:0, y:0},
	destino:{x:0, y:0},
	step:1,totalSteps:1,
	velBullet:1,
	currSpriteName: 'Cuadro3',

	initialize: function(iniPos, endPos) {
    // this is the right way to do it:
		this.pos.x = iniPos.x;
		this.pos.y = iniPos.y;
		this.inicio.x = iniPos.x;
		this.inicio.y = iniPos.y;
		this.destino.x = endPos.x;
		this.destino.y = endPos.y;
		this.step=1;
		this.totalSteps=1;
		this.velBullet=50;
	},

	update:function(){
		//Si la bala se encuentra en el punto de destino
		var dt = this.step/this.totalSteps;
		if(dt>1){
			this.pos=this.destino;
		}else{
			this.pos.x = ((1-dt)*this.inicio.x) + (dt * this.destino.x);
			this.pos.y = ((1-dt)*this.inicio.y) + (dt * this.destino.y);
			this.step++;
		}
	},

	draw : function() { 
        pintarSprite(this.currSpriteName, this.pos.x, this.pos.y);
    },

    calcularSteps : function(){
		var distanciaCuadrado = Math.pow( Math.abs(this.destino.x-this.inicio.x), 2) + Math.pow( Math.abs(this.destino.y-this.inicio.y), 2)
		this.totalSteps = distanciaCuadrado / Math.pow(this.velBullet, 2);
    }
});