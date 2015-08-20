BulletClass = function(iniPos, endPos) {
	EntityClass.call(this);
	
	this.dir = new b2Vec2(iniPos.x, iniPos.y);
	this.dir.Normalize();
	this.inicio={x:iniPos.x, y:iniPos.y};
	this.destino={x:endPos.x, y:endPos.y};
	this.step=1;
	this.totalSteps=1;
	this.velBullet=20;
	this.currSpriteName= 'Cuadro3';

	this.pos.x = iniPos.x;
	this.pos.y = iniPos.y;

	// Create our physics body;
    var entityDef = {
        id: "Bullet",
        type: 'dynamic',
        x: iniPos.x,
        y: iniPos.y,
        halfHeight: 23 * 0.5,
        halfWidth: 28 * 0.5,
        damping: 0,
        angle: 0,
        categories: ['projectile'],
        collidesWith: ['player'],
        userData: {
            "id": "Bullet",
            "ent": this
        }
    };

    this.physBody = gPhysicsEngine.addBody(entityDef);
    this.physBody.SetLinearVelocity(new b2Vec2(this.dir.x * this.velBullet, this.dir.y * this.velBullet));

}

BulletClass.prototype = Object.create(EntityClass.prototype);

BulletClass.prototype.constructor = BulletClass;

BulletClass.prototype.update = function(){
	//Si la bala se encuentra en el punto de destino
	/*var dt = this.step/this.totalSteps;
	if(dt>1){
		this.pos=this.destino;
		GE.entities.push(new SplashClass(this.pos));
		GE.entities.removeObj(this);
	}else{
		this.pos.x = ((1-dt)*this.inicio.x) + (dt * this.destino.x);
		this.pos.y = ((1-dt)*this.inicio.y) + (dt * this.destino.y);
		this.step++;
	}*/

	this.physBody.SetLinearVelocity(new b2Vec2(this.dir.x * this.velBullet, this.dir.y * this.velBullet));

    if(this.physBody !== null) {
        this.pos = this.physBody.GetPosition();
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