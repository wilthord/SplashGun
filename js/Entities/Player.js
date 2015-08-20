PlayerClass = function(){		//Heredamos de la clase entidad
	EntityClass.call(this);
	
	this.currSpriteName = 'Cuadro2';
	this.movimiento = 2;				//Cantidad de movimiento por cada tick
	//Indica el tiempo que debe esperar, para disparar nuevamente
	this.weponColdown = 30;
	//Indica si el arma está lista para disparar, 0: listo, >0 enfriando
	this.weponReadyCountdown = 0;
	//TRUE indica que cada click es un disparo, FALSE que mientras este presionado el mouse, dispara si se ha cumplido el cold down del arma
	this.discreteShoot = true;
}

PlayerClass.prototype = Object.create(EntityClass.prototype);
PlayerClass.prototype.constructor = PlayerClass;

PlayerClass.prototype.update = function(){

	if(this.weponReadyCountdown>0){
		this.weponReadyCountdown--;
	}

	//Validamos si hay acciones pendientes por ejecutar
	if(gInputEngine.actions[MOV_IZQUIERDA]){
		this.pos.x = this.pos.x - this.movimiento;
	}
	if(gInputEngine.actions[MOV_DERECHA]){
		this.pos.x = this.pos.x + this.movimiento;
	}
	if(gInputEngine.actions[MOV_ARRIBA]){
		this.pos.y = this.pos.y - this.movimiento;
	}
	if(gInputEngine.actions[MOV_ABAJO]){
		this.pos.y = this.pos.y + this.movimiento;
	}

	//Validamos si esta activa la accion de disparar
	if(gInputEngine.actions[ACT_DISPARA] && this.weponReadyCountdown==0){
		if(this.discreteShoot){
			this.weponReadyCountdown=this.weponColdown;
		}
		var disparo = new BulletClass(this.pos, GE.marcaMouse.pos);
		disparo.calcularSteps();
		GE.entities.push(disparo);
	}

}