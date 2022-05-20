import React from "react";
import { firebase } from './firebase'
import { nanoid } from "nanoid";


const defaultForm = {
  id: null,
  nombre: "",
  apellido: "",
  edad: "",
};

function App() {
  //hooks
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [edad, setEdad] = React.useState('')
  const [id, setId] = React.useState('')
  const [form, setForm] = React.useState(defaultForm);
  const [list, setList] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);
  const [flag,setFlag]=React.useState(false);
  

  //const [lista, setLista]=React.useState([])
  // const [error, setError]=React.useState(null)
  // const [modoEdicion, setModoEdicion]=React.useState(false)
 const handleEditar = async (e) => {
  try {
    e.preventDefault();
    const db=firebase.firestore()
    await db.collection('usuarios').doc(id).update({
    nombre,apellido,edad
    })
    const listaEditada=list.map(
    (elemento)=>elemento.id===id ?
    {id:id,nombre:nombre,apellido:apellido,edad:edad} :elemento
    )
    setList(listaEditada)//listando nuevos valores
    setEditMode(false)
    setNombre('')
    setApellido('')
    setEdad('')
    setId('')
    setErrors(null)
    } catch (error) {
      console.log(error);
    }
    await handleEditar();
    console.log('editado')
 }
  const agregarNuevoUsuario = async () => {
    try {
      const db = firebase.firestore()
      const nuevoUsuario = {
        nombre, apellido, edad
      }
      const dato = await db.collection('usuarios').add(nuevoUsuario)
      //agregarndo a la lista
      setList([
        ...list,
        { ...nuevoUsuario, id: dato.id }
      ])
    } catch (error) {
      console.log(error);
    }
    if (!editMode) {
      insertData(form);
    } else {
      updateData(form);
    }
    setFlag(!flag);
    setNombre('');
    setApellido('');
    setEdad('');
    setForm(defaultForm);
    setEditMode(false);
    setErrors({});
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setErrors({ nombre: "El nombre es requerido" });
      return;
    }

    if (!apellido.trim()) {
      setErrors({ apellido: "El apellido es requerido" });
      return;
    }

    if (!edad.trim()) {
      setErrors({ edad: "La edad es requeridad" });
      return;
    }
    setForm(defaultForm);
    await agregarNuevoUsuario();
    console.log('Registrado')

  }
  
// Destructuracion de un objeto
    const activarModoEdicion = (user) => {
      const {apellido,nombre,id,edad}=user;
      setEditMode(true);
      setApellido(apellido)
      setNombre(nombre)
      setEdad(edad)
      setId(id)
      setForm(user);
    };

    const insertData = (user) => {
      setList([
        ...list,
        {
          id: nanoid(4),
          nombre: user.nombre,
          apellido: user.apellido,
        },
      ]);
    };

    const updateData = (user) => {
      let updatedList = list.map((data) => (data.id === user.id ? user : data));
      setList(updatedList);
    };

   
      //const filteredList = list.filter((user) => user.id !== id);
      
      //setList(filteredList);

      const deleteData= async (id)=>{
        try {
        const db=firebase.firestore()
        await db.collection('usuarios').doc(id).delete()
        const
        listaFiltrada=list.filter((elemento)=>elemento.id!==id)
        setList(listaFiltrada)
        setFlag (!flag)
        } catch (error) {
        console.log(error);
        }
        }
         
        
    React.useEffect(() => {
      const obtenerDatos = async () => {
        try {
          const db = firebase.firestore()
          const data = await db.collection('usuarios').get()
          /* console.log(data.docs);*/
          const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          console.log(arrayData);
          setList(arrayData);
        } catch (error) {
          console.log(error);
        } 
      }
      obtenerDatos()
    }, [flag])
  
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Registro de Usuarios</h2>
            {(errors.nombre || errors.apellido || errors.edad) && (
              <div className="alert alert-danger">
                <p>{errors.nombre || errors.apellido || errors.edad}</p>
              </div>
            )}
            <form onSubmit={editMode?handleEditar:handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre"
                className="form-control mb-2"
                value={nombre}
                onChange={(e)=>{setNombre(e.target.value)}}
              />
              <input
                type="text"
                name="apellido"
                placeholder="Ingresa tu apellido"
                className="form-control mb-2"
                value={apellido}
                onChange={(e)=>{setApellido(e.target.value)}}
              />
               <input
                type="number"
                name="edad"
                placeholder="Ingresa su edad"
                className="form-control mb-2"
                value={edad}
                onChange={(e)=>{setEdad(e.target.value)}}
              />
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-outline-info">
                  {!editMode ? "Enviar" : "Actualizar"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Lista de usuarios</h2>
            {list.length !== 0 ? (
              <ul className="list-group">
                {
                list.map((user) => (
                  <li key={user.id} className="list-group-item">
                    <div className="row">
                      <div className="col-8">
                        {user.nombre} {user.apellido} {user.edad}
                      </div>
                      <div className="col-4">
                        <button
                          type="button"
                          className="mx-2 btn btn-warning"
                          onClick={() => activarModoEdicion(user)}
                        >
                          Editar
                        </button> */
                        <button
                          type="button"
                          className="mx-2 btn btn-danger"
                          onClick={() => deleteData(user.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))
                }
              </ul>
            ) : (
              <p>No existen registros. Por favor, ingrese los datos</p>
            )}
          </div>
        </div>
      </div>
    );
  }



export default App;
