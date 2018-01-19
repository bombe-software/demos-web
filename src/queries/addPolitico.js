import gql from 'graphql-tag';

export default gql`
 
 mutation AddPolitico($nombre: String,$partido:String, $tipo_politico: String, $estado: String)
  {
    addPolitico(nombre: $nombre, partido:$partido, tipo_politico: $tipo_politico,estado:$estado) 
    {
      nombre,
      partido,
      tipo_politico
      estado
    }
  }
  `;