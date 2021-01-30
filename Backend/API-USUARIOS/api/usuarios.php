<?php
//localhost:8080/..../api/usuarios.php
//echo "Metodo HTTP: ".$_SERVER['REQUEST_METHOD'];

//echo 'Informacion: '.file_get_contents('php://input');

header("Content-Type: application/json");

include('../clases/class-usuario.php');

switch ($_SERVER['REQUEST_METHOD']) {

  case 'POST':
    // code...
    $_POST = json_decode(file_get_contents('php://input'),true);

    $usuario = new Usuario($_POST['nombre'],$_POST['apellido'],$_POST['fechaNacimiento'],$_POST['pais'],$_POST['tipo']);
    $usuario->guardarUsuario();
    $resultado["mensaje"] = "Informacion de Usuario Guardado: ".json_encode($_POST);

    echo json_encode($resultado["mensaje"]);

    break;

  case 'GET':
    // code..
    if(isset($_GET['id']))
    {
      Usuario::obtenerUsuario($_GET['id']);
    }
    else {
      // code...
      Usuario::obtenerUsuarios();
    }

    break;

  case 'PUT':

   $_PUT = json_decode(file_get_contents('php://input'),true);

   $usuario = new Usuario($_PUT['nombre'],$_PUT['apellido'],$_PUT['fechaNacimiento'],$_PUT['pais'],$_PUT['tipo']);
   $usuario->actualizarUsuario($_GET['id']);

   Usuario::obtenerUsuario($_GET['id']);

   break;

  case 'DELETE':

    Usuario::eliminarUsuario($_GET['id']);

    Usuario::obtenerUsuarios();

    break;

  default:
    // code...
    $resultado["mensaje"] = "Enviaste solicitud incorrecta";
    echo json_encode($resultado["mensaje"]);
    break;
}


//Recibir peticiones del usuario


//Crear


//Obtener un usuario


//Obtener todos los usuarios


//Actualizar un usuario


//Eliminar un usuario


 ?>
