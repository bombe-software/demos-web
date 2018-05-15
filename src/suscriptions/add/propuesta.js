import gql from 'graphql-tag';

export default gql`
mutation add_propuesta($fecha: String, $titulo: String, $descripcion: String, $tipo_propuesta: ID, $referencia: String, $usuario: ID, $politico: ID) {
  add_propuesta(fecha: $fecha, descripcion: $descripcion, tipo_propuesta: $tipo_propuesta, referencia: $referencia, usuario: $usuario, politico: $politico, titulo: $titulo) {
    id
  }
}  
`;