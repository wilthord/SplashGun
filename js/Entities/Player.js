PlayerClass = Class.create(EntityClass, {		//Heredamos de la clase entidad
	pos : {x:0,y:0},
	zindex: 70,
	currSpriteName: 'Cuadro2',
	movimiento:2,				//Cantidad de movimiento por cada tick
	//Indica el tiempo que debe esperar, para disparar nuevamente
	weponColdown:30,
	//Indica si el arma está lista para disparar, 0: listo, >0 enfriando
	weponReadyCountdown:0,
	//TRUE indica que cada click es un disparo, FALSE que mientras este presionado el mouse, dispara si se ha cumplido el cold down del arma
	discreteShoot:true,

	update:function(){

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
			/*disparo.pos.x = this.pos.x;
			disparo.pos.x = this.pos.x;
			disparo.inicio.x = this.pos.x;
			disparo.inicio.y = this.pos.y;
			disparo.destino.x = GE.marcaMouse.pos.x;
			disparo.destino.y = GE.marcaMouse.pos.y;*/
			disparo.calcularSteps();
			GE.entities.push(disparo);
		}

	},

	draw : function() { 
        pintarSprite(this.currSpriteName, this.pos.x, this.pos.y);
    }
});
