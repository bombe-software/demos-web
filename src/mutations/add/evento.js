import gql from 'graphql-tag';

export default gql`
mutation add_evento($fecha: String, $titulo: String, $descripcion: String, $referencia: String, $usuario: ID, $politico: ID) {
  add_evento(fecha: $fecha, descripcion: $descripcion, referencia: $referencia, usuario: $usuario, politico: $politico, titulo: $titulo) {
    id
  }
}  
`;