import gql from 'graphql-tag';

export default gql`
mutation AddPolitico(
  $nombre: String,
  $partido: ID,
  $tipo_politico: ID,
  $estado:ID
){
  addPolitico(
    nombre: $nombre, 
    partido: $partido, 
    tipo_politico: $tipo_politico, 
    estado: $estado
)
  {
    respuesta
  }
}
`;