var usuarios = [];
var usuarioSeleccionado;

var url = 'https://en-linea.app/API-Usuarios/Backend/API-USUARIOS/api/usuarios.php';

function obtenerUsuarios()
{
    axios({
      method:'GET',
      url: url,
      responseType:'json'
    }).then(res=>{
      console.log(res.data);
      this.usuarios = res.data;
      llenarTabla();
    }).catch(error=>{
      console.error(error);
    });
}

obtenerUsuarios();


function llenarTabla()
{
  document.querySelector('#tabla-usuarios tbody').innerHTML = '';
  const tbody =document.querySelector('#tabla-usuarios tbody');

  for(let i=0; i<usuarios.length;i++)
  {
       let fila = tbody.insertRow();
       fila.insertCell().innerHTML = usuarios[i]['nombre'];
       fila.insertCell().innerHTML = usuarios[i]['apellido'];
       fila.insertCell().innerHTML = usuarios[i]['fechaNacimiento'];
       fila.insertCell().innerHTML = usuarios[i]['pais'];

       boton_eliminar = fila.insertCell();
       boton_eliminar.innerHTML = '<button type="button">Eliminar</button>';
       boton_eliminar.addEventListener('click', function() {
           eliminar(i);
       });

       boton_seleccionar = fila.insertCell();
       boton_seleccionar.innerHTML = '<button type="button">Seleccionar</button>';
       boton_seleccionar.addEventListener('click', function() {
           seleccionar(i);
       });

  }
}


function eliminar(id)
{
   console.log('Eliminar el elemento con el indice ' + id);

   axios({
     method:'DELETE',
     url: url + '?id=' + id,
     responseType:'json'
   }).then(res=>{
     console.log(res.data);
     this.usuarios = res.data;
     obtenerUsuarios();
   }).catch(error=>{
     console.error(error);
   });
}


function guardar()
{
  let usuario = {
     nombre: document.getElementById('nombre').value,
     apellido:document.getElementById('apellido').value,
     fechaNacimiento:document.getElementById('fechaNacimiento').value,
     pais: document.getElementById('pais').value
  };

  console.log("usuario a guardar: ", usuario);

  axios({
    method:'POST',
    url: url,
    responseType:'json',
    data:usuario
  }).then(res=>{
    console.log(res.data);
    this.usuarios = res.data;
    obtenerUsuarios();
  }).catch(error=>{
    console.error(error);
  });
}

function seleccionar(indice)
{
   usuarioSeleccionado = indice;

    axios({
      method:'GET',
      url: url + "?id=" + indice,
      responseType:'json'
    }).then(res=>{
      console.log(res.data);
      document.getElementById('nombre').value = res.data.nombre;
      document.getElementById('apellido').value = res.data.apellido;
      document.getElementById('fechaNacimiento').value = res.data.fechaNacimiento;
      document.getElementById('pais').value = res.data.pais;
    }).catch(error=>{
      console.error(error);
    });

}

function actualizar()
{
  let usuario = {
     nombre: document.getElementById('nombre').value,
     apellido:document.getElementById('apellido').value,
     fechaNacimiento:document.getElementById('fechaNacimiento').value,
     pais: document.getElementById('pais').value
  };

  axios({
    method:'PUT',
    url: url + "?id=" + usuarioSeleccionado,
    responseType:'json',
    data:usuario
  }).then(res=>{
    console.log(res.data);
    this.usuarios = res.data;
    obtenerUsuarios();
  }).catch(error=>{
    console.error(error);
  });
}


function limpiar()
{
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('fechaNacimiento').value = '';
  document.getElementById('pais').value = '';
}
