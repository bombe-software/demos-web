import gql from 'graphql-tag';

export default gql`
mutation AddEvento(
  $fecha: String,
  $titulo: String,
  $descripcion: String,
  $referencia: String,
  $usuario: ID,
  $politico: ID
){
  addEvento(
    fecha: $fecha, 
    titulo: $titulo
    descripcion: $descripcion,
    referencia: $referencia,
    usuario: $usuario,
    politico: $politico
)
  {
		id
  }
}
`;