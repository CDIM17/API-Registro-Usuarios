<?php

//localhost

class Usuario
{

  private $nombre;
  private $apellido;
  private $fechaNacimiento;
  private $pais;

   function __construct($nombre,$apellido,$fechaNacimiento,$pais)
   {
       // code...
       $this->nombre          = $nombre;
       $this->apellido        = $apellido;
       $this->fechaNacimiento = $fechaNacimiento;
       $this->pais          = $pais;
   }

   public function guardarUsuario()
   {
     // code...
     $contenido = file_get_contents('../data/usuarios.json');
     $usuarios  = json_decode($contenido,true);
     $usuarios[]  = array(
       'nombre'          => $this->nombre,
       'apellido'        => $this->apellido,
       'fechaNacimiento' => $this->fechaNacimiento,
       'pais'            => $this->pais
     );

     $archivo = fopen("../data/usuarios.json","w");
     fwrite($archivo,json_encode($usuarios));
     fclose($archivo);

   }

   public static function obtenerUsuarios()
   {
      // code...
      $contenido = file_get_contents('../data/usuarios.json');
      echo $contenido;
   }

   public static function obtenerUsuario($indice)
   {
      // code...
      $contenido = file_get_contents('../data/usuarios.json');
      $usuarios  = json_decode($contenido, true);

      echo json_encode($usuarios[$indice]);
   }



   public function actualizarUsuario($indice)
   {
         // code...
         $contenido = file_get_contents('../data/usuarios.json');
         $usuarios = json_decode($contenido,true);

         $usuario = array(
           'nombre'          => $this->nombre,
           'apellido'        => $this->apellido,
           'fechaNacimiento' => $this->fechaNacimiento,
           'pais'            => $this->pais
         );

         $usuarios[$indice] = $usuario;

        $archivo = fopen("../data/usuarios.json","w");
        fwrite($archivo,json_encode($usuarios));
        fclose($archivo);
   }

   public static function eliminarUsuario($indice)
   {
      // code...
      $contenido = file_get_contents('../data/usuarios.json');
      $usuarios = json_decode($contenido,true);

      array_splice($usuarios,$indice,1);

     $archivo = fopen("../data/usuarios.json","w");
     fwrite($archivo,json_encode($usuarios));
     fclose($archivo);
   }

    public function getNombre()
    {
        return $this->nombre;
    }


    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }


    public function getApellido()
    {
        return $this->apellido;
    }


    public function setApellido($apellido)
    {
        $this->apellido = $apellido;

        return $this;
    }


    public function getFechaNacimiento()
    {
        return $this->fechaNacimiento;
    }


    public function setFechaNacimiento($fechaNacimiento)
    {
        $this->fechaNacimiento = $fechaNacimiento;

        return $this;
    }


    public function getpais()
    {
        return $this->pais;
    }


    public function setpais($pais)
    {
        $this->pais = $pais;

        return $this;
    }

}



 ?>
