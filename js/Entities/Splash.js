SplashClass = function(posicion){
	EntityClass.call(this);
	this.currSpriteName = "SplashAcido";
	this.damage = 5;
	this.pos.x = posicion.x;
	this.pos.y = posicion.y;
	this.isDead=false;

    this.h=2;

    this.w=2;

	// Create our physics body;
    var entityDef = {
        id: "Splash",
        type: 'dynamic',
        x: this.pos.x,
        y: this.pos.y,
        halfHeight: 23 * 0.5,
        halfWidth: 23 * 0.5,
        damping: 0,
        angle: 0,
        filterGroupIndex:-2,
        categories: ['projectile'],
        collidesWith: ['player'],
        userData: {
            "id": "Splash",
            "ent": this
        }
    };

    this.physBody = gPhysicsEngine.addBody(entityDef);
}

SplashClass.prototype = Object.create(EntityClass.prototype);

SplashClass.prototype.constructor = SplashClass;