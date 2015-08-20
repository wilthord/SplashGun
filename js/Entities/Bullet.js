BulletClass = function(iniPos, endPos) {
	EntityClass.call(this);
	//pos:{x:0, y:0},
	this.inicio={x:0, y:0};
	this.destino={x:0, y:0};
	this.step=1;
	this.totalSteps=1;
	this.velBullet=1;
	this.currSpriteName= 'Cuadro3';

	this.pos.x = iniPos.x;
	this.pos.y = iniPos.y;
	this.inicio.x = iniPos.x;
	this.inicio.y = iniPos.y;
	this.destino.x = endPos.x;
	this.destino.y = endPos.y;
	this.step=1;
	this.totalSteps=1;
	this.velBullet=50;

}

BulletClass.prototype = Object.create(EntityClass.prototype);

BulletClass.prototype.constructor = BulletClass;

BulletClass.prototype.update = function(){
	//Si la bala se encuentra en el punto de destino
	var dt = this.step/this.totalSteps;
	if(dt>1){
		this.pos=this.destino;
	}else{
		this.pos.x = ((1-dt)*this.inicio.x) + (dt * this.destino.x);
		this.pos.y = ((1-dt)*this.inicio.y) + (dt * this.destino.y);
		this.step++;
	}
}

/*
	draw : function() { 
        pintarSprite(this.currSpriteName, this.pos.x, this.pos.y);
    },
*/

BulletClass.prototype.calcularSteps = function(){
	var distanciaCuadrado = Math.pow( Math.abs(this.destino.x-this.inicio.x), 2) + Math.pow( Math.abs(this.destino.y-this.inicio.y), 2)
	this.totalSteps = distanciaCuadrado / Math.pow(this.velBullet, 2);
}