var optionDistrict = document.getElementById('optionDistrict');

/* PETICION AJAX   http://airemad.com/api/v1/pollution/S056 es la buena*/

var resultados = [];
var url = 'http://private-anon-bfc6c9db09-airemad.apiary-mock.com/api/v1/pollution';

function peticionAjax(url, callback) { // Con callback lo que haces es decirle q tiene otro parámetro que aun no se ha definido (se hace luego).

    var peticion = new XMLHttpRequest();
    peticion.open('GET', url);
    peticion.onreadystatechange = function () {
        if (this.readyState === 4) {
          callback(this.responseText); // dentro de callback paso this.responseText
        }
      };
    peticion.send();
};

peticionAjax(url, function(data){ // Aki definimos callback!!!
  resultados= JSON.parse(data);
  // console.log(resultados);
  pintaDistritos();

  return resultados;
});

/* FUNCION PARA PINTAR DISTRITOS DENTRO DEL INPUT */
var idLista = [];

function pintaDistritos(){
  for (var i = 0; i < resultados.length; i++) {

    var distritoId = resultados[i].id;
    var distritoNombre = resultados[i].name;
    optionDistrict.innerHTML += '<option class="menu_Element" id="' + distritoId + '" value="' + distritoId + '" name="distrito">' + distritoNombre + '</option>' ;
    // Relleno array de id's:
    idLista.push(distritoId);
  };
};
/**  Tenemos el id del distrito
* 1. pasar el id a resultados para obtener los datos de una estación concreta:
* 2. Renderizar los datos de la estación
* 3. Renderizar los datos concretos
*/
var idSeleccionado = '';
function giveId(){
  idSeleccionado = optionDistrict.value;
  pintaDatos(resultados); // Llamada a rellenar la lista cuando cambia el distrito seleccionado.
  return idSeleccionado;
}

function pintaDatos(resultados){
  // Limpio la lista de datos:
  var container = document.getElementById('values');
  var fc = container.firstChild;

  while( fc ) {
      container.removeChild( fc );
      fc = container.firstChild;
  };

  var datoContaminante = '';
  for (var i = 0; i < resultados.length; i++) {

    if (resultados[i].id == idSeleccionado) {
      // En caso de que el id seleccionado en el select coincida con el id de algún resultado continúa trabajando
      // Almaceno el registro en cuestion en una variable
      var estacion = resultados[i];

      for (var element in estacion) {
        if (typeof(estacion[element]) === 'object'){

            for (var j = 0; j < estacion[element].values.length; j++) {

              if (estacion[element].values[j].estado == 'Pendiente') {
                // Declaro la variable que almacena los datos de cada contaminante en la última medición disponible
                var medidaVar = estacion[element].values[j - 1].valor;
                break;
              }
            }
            //Renderizo en la lista los elementos
            container.innerHTML += '<li class="values-element">' + estacion[element].parameter + ' (' + estacion[element].abrebiation + '): ' + medidaVar + '  μg/m3</li>' ;
       };
     };
       break;
    };

      // for (var element in resultados[i]) {
      //     if (typeof(resultados[i][element]) === 'object'){
      //   container.innerHTML += '<li class="values-element">' + resultados[i][element].parameter + ' (' + resultados[i][element].abrebiation + '): ' + 'MEDIDAVAR' + ' </li>' ;
      //   };
      // }


  };

};



/* FUNCIONES PARA PINTAR LOS RESULTADOS DENTRO DE LA LISTA */

//Función para determinar el elemento del input elegido:
//info sacada de "https://www.lawebdelprogramador.com/codigo/JavaScript/3605-Mostrar-el-texto-del-select-seleccionado-en-un-input-type-text.html"

/**
	 * Función que recibe el objeto seleccionado
	 *
	 * objeto.value contiene el value del elemento seleccionado
	 * objeto[value].innerHTML contiene el texto del valor seleccionado
	 */

	// function mostrar(objeto)
	// {
	// 	if(objeto.value==0)
	// 	{
	// 		document.getElementById("idSeleccionado").value="0";
	// 		document.getElementById("textoSeleccionado").value="Default";
	// 	}else{
	// 		document.getElementById("idSeleccionado").value=objeto.value;
	// 		document.getElementById("textoSeleccionado").value=objeto[objeto.value].innerHTML;
	// 	}
	// }
// Función determinar el estado para saber que elemnto pintar:

// Pintar los datos
