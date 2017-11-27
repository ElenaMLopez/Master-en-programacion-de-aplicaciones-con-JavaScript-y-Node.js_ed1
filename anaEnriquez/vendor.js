// Control de sesiones

// no dinero, sistema de puntos

// cada user tiene puntos asignados por el personal

// no hay préstamos

// Control de stock

var vendorMachine = {}
var products = [["potatos",33,5],["milkshake",10,3],["apple",7,2],["chocolateBar",20,3],["bun",13,4]];
var clientsList = [

	{
		name: "ana enríquez",
		user: "ann_eav",
		pass: "troll",
		userRole: "ceo",
		wallet: 1000000,
		// Array bidimensional, fecha y gasto
		log: []
	},
	{
		name: "jose luis cortés",
		user: "pinguinoTonto",
		pass: "lol",
		userRole: "becario",
		wallet: 5,
		log: []
	}

]

// var Arr=[[1,2],[3,4],[5,6]]; arrays bidimensionales
function cleanData(string){

	error = true;
	while(error) {
		
		string = string.trim();
		if(string) {
			//Sólo puede haber mayúsculas y minúsculas y acentos y ñ españoles
			var specialChars = /[^\A-Za-z\ñ\á\é\í\ó\ú\s]/g;
			var moreSpaces = /\s{2,}/g;

			if(specialChars.test(string) || moreSpaces.test(string)) {

				return false;

			} else {

				error = false;
				return true;

			}
		} return false;
	
	}

}

function login(username) {
	// Función para iniciar sesión
	// 		códigos de error
	//		0 = no user
	//		1 = password incorrect
	var found = false;
	id(!username){var username = prompt("Introduce tu usuario");}
	for(client in clientsList) {

		if(clientsList[client].user === username) {

			var password = prompt("Introduce la contraseña");

			if(clientsList[client].pass === password) {

				found = true;
				return [clientsList[client].user,clientsList[client].pass,clientsList[client].wallet,clientsList[client].log];

			} else { return "La contraseña es incorrecta" }

		} 

	}

	if(!found) { return "No hay ningún empleado con ese usuario" }
}

function foundCoincidence(field, value) {

	var found = false;
	
	for(client in clientsList) {

		console.log(field, clientsList[client][field], value);
		if(clientsList[client][field] === value) {

			//console.log(field, clientsList[client].field, value);
			found = true;
			return true;

		}

	}

	if(!found) { return false }
}

function checkWallet() {

	var logged = login();

	if(typeof(logged) === "object") {
		
		console.info(logged[2]);

	} else console.info(logged);

}

function checkHistory() {

	var logged = login();

	if(typeof(logged) === "object") {
		
		console.info(logged[3]);

	} else console.info(logged);

}

function createUser() {

	var masterPass = prompt("Introduce la contraseña maestra");

	if(masterPass === "Fictizia mola") {

		var newEntry = {};

		errorName = true;
		while(errorName) {
			var newName = prompt("Introduce el nombre del trabajador");

			if(cleanData(newName)) {
				newName = newName.trim();
				newName = newName.toLowerCase();
				newEntry.name = newName;
				errorName = false;
			}else { console.log("El nombre sólo puede contener letras y espacios");}
		}

		errorUser = true;
		while(errorUser) {
			var newUser = prompt("Introduce el nickname del trabajador");

			if(cleanData(newUser)) {
				newUser = newUser.trim();
				newUSer = newUser.toLowerCase();
				newEntry.user = newUser;
				errorUser = false;
			}else { console.log("El nickname sólo puede contener letras y espacios")}
		}
		
		errorPass = true;
		while(errorPass) {
			var newPass = prompt("Introduce la contraseña para el trabajador");
			var repeatPass = prompt("Repite la contrasña");

			if(newPass === repeatPass) {
				newEntry.pass = newPass;
				errorPass = false;
			} else { console.log("Las contraseñas tienen que ser iguales")}
		}

		errorRole = true;
		while(errorRole) {
			var newRole = prompt("Introduce el puesto de trabajo del trabajador");

			if(cleanData(newRole)) {
				newRole = newRole.trim();
				newRole = newRole.toLowerCase();
				newEntry.userRole = newRole;
				errorRole = false;
			}else { console.log("El puesto de trabajo sólo puede contener letras y espacios")}
		}

		newEntry.wallet = 0;
		newEntry.log = [];
		if(foundCoincidence("name", newEntry.name) || foundCoincidence("user", newEntry.user)) {
			return console.log("El trabajador o el nombre de usuario ya existen, inténtalo de nuevo")
		} else { clientsList.push(newEntry); }
		

	}else { console.info("La contraseña maestra es incorrecta. Acceso denegado") }

}
function deleteUser() {
	var masterPass = prompt("Introduce la contraseña maestra");

	if(masterPass === "Fictizia mola") {

		var userName = prompt("Introduce el usuario del trabajador que deseas eliminar");

		if(foundCoincidence("user", userName)) {

			for(i = 0; i < clientsList.length; i++) {
    			if(clientsList[i].user === userName) {
    				//console.log(i, clientsList[i].user, userName);
       				clientsList.splice(i, 1);
    			}
			}
			console.log("El usuario ha sido eliminado con exito")
			
		} else { return console.log("El usuario no existe, inténtalo de nuevo") }

	}else { console.info("La contraseña maestra es incorrecta. Acceso denegado") }

}

function buyProduct(user) {
	var logged = login(user);

	if(typeof(logged) === "object") {
		
		var election = prompt("¿Qué quieres comprar hoy?");

		var exists = false;

		for(i=0;i<products.length;i++) {
			if(products[i][0] === election) {

				if(products[i][1] > 0){
					if(logged[2]>=products[i][2]){

						products[i][1] --;
						

					}
				}elsev{console.log("Lo siento, no tenemos stock disponible")}
				

			}
		}

		if(!exists){console.log("El producto que has introducido no existe")}

	} else console.info(logged);
}