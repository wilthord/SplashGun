EnemyClass = function(iniPos){
	EntityClass.call(this);
	this.currSpriteName = 'Cuadro5';
	this.energy = 10;
	this.speed = 50;
	this.damage = 3;

	this.dir = new b2Vec2(GE.personaje.pos.x, GE.personaje.pos.y);
	this.dir.Subtract(iniPos);
	this.dir.Normalize();

	// Create our physics body;
    var entityDef = {
        id: "Enemy",
        type: 'dynamic',
        x: iniPos.x,
        y: iniPos.y,
        halfHeight: 23 * 0.5,
        halfWidth: 23 * 0.5,
        damping: 0,
        angle: 0,
        filterGroupIndex:-2,
        categories: ['projectile'],
        collidesWith: ['player'],
        userData: {
            "id": "Enemy",
            "ent": this
        }
    };

    this.physBody = gPhysicsEngine.addBody(entityDef);
    this.physBody.SetLinearVelocity(new b2Vec2(this.dir.x * this.speed, this.dir.y * this.speed));

}

EnemyClass.prototype = Object.create(EntityClass.prototype);

EnemyClass.prototype.constructor = EnemyClass;

EnemyClass.prototype.update = function(){

	if(this.physBody !== null) {
        this.pos = this.physBody.GetPosition();
    }
    
}