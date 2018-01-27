import gql from 'graphql-tag';

export default gql`
mutation AddEvento(
  $fecha: String,
  $titulo: String,
  $descripcion: String
){
  addEvento(
    fecha: $fecha, 
    titulo: $titulo
    descripcion: $descripcion
)
  {
		id
  }
}
`;