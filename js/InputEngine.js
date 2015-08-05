//Se declaran las "constantes" para el control de acciones
MOV_ARRIBA = 'move-up';
MOV_IZQUIERDA = 'move-left';
MOV_ABAJO = 'move-down';
MOV_DERECHA = 'move-right';

InputEngineClass = Class.create({

	// Diccionario con la relación entre las teclas y la acción
	bindings: {},

	// Diccionario con las acciones que se han enviado para ejecutar
	actions: {},

	// Posición del mouse
	mouse: {
		x: 0,
		y: 0
	},

	//-----------------------------
	setup: function () {
		// Se asocian las teclas W, A, S, D a las acciones respectivas
		gInputEngine.bind(87, MOV_ARRIBA);
		gInputEngine.bind(65, MOV_IZQUIERDA);
		gInputEngine.bind(83, MOV_ABAJO);
		gInputEngine.bind(68, MOV_DERECHA);

		// Se agregan los listeners para los eventos de ingreso
		document.getElementById(GE.nombreCanvas).addEventListener('mousemove', gInputEngine.onMouseMove);
		document.addEventListener('keydown', gInputEngine.onKeyDown);
		document.addEventListener('keyup', gInputEngine.onKeyUp);
	},

	//-----------------------------
	onMouseMove: function (event) {
		gInputEngine.mouse.x = event.clientX;
		gInputEngine.mouse.y = event.clientY;
	},

	//-----------------------------
	onKeyDown: function (event) {
		// Se obtiene la accion relacionada a la tecla presionada
		var action = gInputEngine.bindings[event.keyCode];

		//Si la tecla presionada se encuentra mapeada
		if (action) {
			// Se marca la acción como true, mientras esté en true se ejecutará la acción
			gInputEngine.actions[action] = true;
		}
	},

	//-----------------------------
	onKeyUp: function (event) {
		
		// Se obtiene la accion relacionada a la tecla liberada
		var action = gInputEngine.bindings[event.keyCode];

		//Si la tecla presionada se encuentra mapeada
		if (action) {
			// Se marca la acción como false, no se realizará mas la acción
			gInputEngine.actions[action] = false;
		}
	},

	// Metodo que permite mapear una tecla con una acción
	bind: function (key, action) {
		gInputEngine.bindings[key] = action;
	}

});

gInputEngine = new InputEngineClass();