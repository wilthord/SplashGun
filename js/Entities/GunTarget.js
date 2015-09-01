GunTargetClass = function(){
	EntityClass.call(this);
	//pos : {x:0,y:0},
	this.zindex = 70;
	this.currSpriteName = 'MarcaMouse';

	this.h=3;

	this.w=3;
}

GunTargetClass.prototype = Object.create(EntityClass.prototype);
GunTargetClass.prototype.constructor = GunTargetClass;

GunTargetClass.prototype.update = function() {
		this.pos.x = gInputEngine.mouse.x;
		this.pos.y = gInputEngine.mouse.y;
}