import gql from 'graphql-tag';

export default gql`
mutation AddPropuesta(
  $fecha: String,
  $descripcion: String,
  $tipo_propuesta: ID
){
  addPropuesta(
    fecha: $fecha, 
    descripcion: $descripcion, 
    tipo_propuesta: $tipo_propuesta,
)
  {
		id
  }
}
`;