SplashClass = function(posicion){
	EntityClass.call(this);
	this.currSpriteName = "Cuadro4";
	this.damage = 5;
	this.pos.x = posicion.x;
	this.pos.y = posicion.y;
}

SplashClass.prototype = Object.create(EntityClass.prototype);

SplashClass.prototype.constructor = SplashClass;