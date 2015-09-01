/** Codigo para presentar estadisticas de rendimiento en tiempo real **/
var stats = new Stats();
stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

document.getElementById("divStats").appendChild(stats.domElement);
/** Fin del codigo de estadisticas **/

GameEngineClass = function(){

	this.ctx = {};

	this.canvasObj = {};

	this.canvasSize = {w:500, h:500};

	this.entities=[];

	this.personaje={};

	this.marcaMouse={};

	this.nombreCanvas='myCanvas';

	this.enemySpawnTime = 600;

	this.nextEnemySpawn = 0;
}

GameEngineClass.prototype.setup = function () {

    // Create physics engine
    gPhysicsEngine.create();

    // Add contact listener
    gPhysicsEngine.addContactListener({

        PostSolve: function (bodyA, bodyB, impulse) {
            var uA = bodyA ? bodyA.GetUserData() : null;
            var uB = bodyB ? bodyB.GetUserData() : null;

            if (uA !== null) {
                if (uA.ent !== null && uA.ent.onTouch) {
                    uA.ent.onTouch(bodyB, null, impulse);
                }
            }

            if (uB !== null) {
                if (uB.ent !== null && uB.ent.onTouch) {
                    uB.ent.onTouch(bodyA, null, impulse);
                }
            }
        }
    });

}

GameEngineClass.prototype.constructor = GameEngineClass;
	// Metodo invocado cuando se terminan de cargar los sprites
GameEngineClass.prototype.callbackIniciar = function(){
	//Creamos el apuntador (Posición del mouse)
	GE.marcaMouse = new GunTargetClass();
	// Guardamos la nueva entidad, en nuestra lista de entidades
	GE.entities.push(GE.marcaMouse);

	//Creamos al personaje
	GE.personaje = new PlayerClass();
	GE.personaje.pos.x=100;
	GE.personaje.pos.y=100;

	//Guardamos al personaje en la lista de entidades
	GE.entities.push(GE.personaje);

	/** Inicio de la sección para preparar un gameLoop eficiente **/
	var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null;

    if ( animFrame !== null ) {

    	// Metodo recursivo controlado por el navegador, para hacer invocaciones de animaciones eficientemente
        var recursiveLoop = function() {
            //Tick del gameLoop
            GE.tick();
            //Se invoca el siguiente Tick del gameLoop, utilizando requestAnimationFrame o el disponible
            animFrame( recursiveLoop );
        };

        // Iniciamos el Game Loop
        animFrame( recursiveLoop );
    } else {
    	// Si no está disponible ninguna versión del requestAnimationFrame, se inicia el gameloop con setInterval
        var ONE_FRAME_TIME = 1000.0 / 60.0 ;
        setInterval( GE.tick, ONE_FRAME_TIME );
    }

    gInputEngine.setup();

    /** Fin de preparación del gameLoop **/
	
}

GameEngineClass.prototype.init=function(){
	this.canvasObj = document.getElementById("myCanvas");
	this.canvasObj.width = this.canvasSize.w;
	this.canvasObj.height = this.canvasSize.h;
	GE.ctx = this.canvasObj.getContext("2d");
	loadSprites("img/spriteSheetMap.json", GE.callbackIniciar);
	// Se inicializa el PhysicsEngine
	this.setup();
}

GameEngineClass.prototype.tick = function() {

	// Iniciamos el monitoreo
	stats.begin();

    GE.updateGame();
    GE.drawGame();

    //Finalizamos el monitoreo
    stats.end();
}

GameEngineClass.prototype.updateGame=function(){
	var entidadesEliminar = [];
	GE.entities.forEach(function(entidad) {
		if(entidad.isDead){
			entidadesEliminar.push(entidad);
		}else{
			entidad.update();
		}
	});
	
	for (var j = 0; j < entidadesEliminar.length; j++) {
		if(entidadesEliminar[j].physBody) gPhysicsEngine.removeBody(entidadesEliminar[j].physBody);
		gPhysicsEngine.removeBody(entidadesEliminar[j]);
        this.entities.removeObj(entidadesEliminar[j]);
    }

	gPhysicsEngine.update();

	//Validamos si es momento de generar un nuevo enemigo
	if(this.nextEnemySpawn===0) this.spawnEnemy();
}

GameEngineClass.prototype.drawGame=function(){
	this.ctx.fillStyle = "rgb(250, 250, 250)";
	this.ctx.fillRect(0,0,this.canvasSize.w,this.canvasSize.h);
	GE.entities.forEach(function(entidad) {
		entidad.draw();
	});
}

GameEngineClass.prototype.spawnEnemy = function(){
	var nuevoEnemigo = new EnemyClass({x:0, y:0});
	this.nextEnemySpawn=this.enemySpawnTime;
	this.entities.push(nuevoEnemigo);
}


GE = new GameEngineClass();
GE.init();