/** Codigo para presentar estadisticas de rendimiento en tiempo real **/
var stats = new Stats();
stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

document.getElementById("divStats").appendChild(stats.domElement);
/** Fin del codigo de estadisticas **/

GameEngineClass = Class.create({

	ctx : {},

	canvasSize : {w:500, h:500},

	entities:[],

	personaje:{},

	marcaMouse:{},

	nombreCanvas:'myCanvas',

	// Metodo invocado cuando se terminan de cargar los sprites
	callbackIniciar: function(){
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
		
	},

	init:function(){
		var canvasObj = document.getElementById("myCanvas");
		canvasObj.width = this.canvasSize.w;
		canvasObj.height = this.canvasSize.h;
		GE.ctx = canvasObj.getContext("2d");
		loadSprites("img/spriteSheetMap.json", GE.callbackIniciar);
	},

	tick : function() {

		// Iniciamos el monitoreo
		stats.begin();

        GE.updateGame();
        GE.drawGame();

        //Finalizamos el monitoreo
        stats.end();
    },

    updateGame:function(){
    	GE.entities.forEach(function(entidad) {
    		entidad.update();
    	});

    	
    },

    drawGame:function(){
    	this.ctx.fillStyle = "rgb(250, 250, 250)";
    	this.ctx.fillRect(0,0,this.canvasSize.w,this.canvasSize.h);
    	GE.entities.forEach(function(entidad) {
    		entidad.draw();
    	});
    }

});

GE = new GameEngineClass();
GE.init();