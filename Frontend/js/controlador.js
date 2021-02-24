var usuarios = [];
var usuarioSeleccionado;

//const url = 'https://en-linea.app/AlwaysVacant/BackEnd/API/Usuarios/usuario.php';

//const url = 'http://localhost:8888/always-vacant-heroku/API/Usuarios/usuario.php';

const url = 'https://always-vacant.herokuapp.com/API/auth.php';

function obtenerUsuarios()
{
  let datos = {
    token:'bdab9c861e26129ddf9f1263bb0baa2a'
 };

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
       fila.insertCell().innerHTML = usuarios[i]['ID_Categoria'];
       fila.insertCell().innerHTML = usuarios[i]['Compania'];
       fila.insertCell().innerHTML = usuarios[i]['URL'];


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
     Usuario: document.getElementById('nombre').value,
     Contrasena:document.getElementById('apellido').value,
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
