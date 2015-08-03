//Mapa de todas las SpriteSheets
spriteSheetsMap={};

SpriteSheetClass = Class.create({

    // We store in the SpriteSheetClass:
    //
    // The Image object that we created for our
    // atlas.
	img: null,

    // The URL path that we grabbed our atlas
    // from.
	url: "",

    // An array of all the sprites in our atlas.
	sprites: [],

    defSprite: function (nombre, x, y, w, h) {

        var spt = new Sprite();
        
        spt.id = nombre;
        spt.x = x;
        spt.y = y;
        spt.w = w;
        spt.h = h;

        this.sprites.push(spt);
    },


    getSprite: function (nombre) {

        for(var i = 0; i < this.sprites.length; i++) {
            
            if(this.sprites[i].id === nombre) {

                return this.sprites[i];
            }

        }

        return null;
    }
     
});


function loadSprites(spritesFilesURL, callbackIniciar){
    xhrGet(spritesFilesURL, function (data) {
            callbackJSONImagenes(data.currentTarget.responseText, callbackIniciar);
        }
    );
}

function callbackJSONImagenes(respuestaText, callbackIniciar){

    var obj = JSON.parse(respuestaText);

    var mySpriteSheet = {};
    var mySpriteJson = {};

    for(i=0; i < obj.sheets.length; i++) {

        mySpriteSheet = new SpriteSheetClass();     //Creamos una nueva instancia de la SpriteSheet
        var img = new Image();                      //Creamos una imagen, que será nuestra spriteSheet
        img.src = obj.sheets[i].imgURL;             //Cargamos la imagen;
        mySpriteSheet.url = img.src;                //Guardamos la URL de la imagen en el objeto Spritesheet
        mySpriteSheet.img =  img;                   //Guardamos la imagen en el objeto SpriteSheet

        for( j=0; j<obj.sheets[i].sprites.length; j++){     //Recorremos todos los sprites de la SpriteSheet
            mySpriteJson = obj.sheets[i].sprites[j];

            mySpriteSheet.defSprite(mySpriteJson.name, mySpriteJson.x, mySpriteJson.y, mySpriteJson.w, mySpriteJson.h);     //Creamos el sprite dentro de la SpriteSheet;
            
       }

       spriteSheetsMap[obj.sheets[i].sheetName] = mySpriteSheet;        //Se guarda el objeto SpriteSheet en el mapa de SpriteSheets
    }

    callbackIniciar();

}

//Dibuja el Sprite con nombre "nombreSprite" en la posicion X, Y
function pintarSprite(nombreSprite, x, y){

    var sprite = {};
    var sheet = {};

    for(var sheetName in spriteSheetsMap) {

        sheet = spriteSheetsMap[sheetName];             //Consultamos SpriteSheet por SpriteSheet
        sprite = sheet.getSprite(nombreSprite);         //Buscamos el Sprite en la sheet actual

        //Si no se encontró el Sprite, se sigue con el siclo
        if(sprite === null) {
            continue;
        }else{
            break;
        }

    }

    if (sprite === null || sheet === null) {
        return;
    }

    ctx.drawImage(sheet.img, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
}