import gql from 'graphql-tag';

export default gql`
mutation update_evento($id_evento: ID, $titulo: String, $descripcion: String, $referencia: String, $usuario: ID, $fecha: String, $politico: ID) {
  update_evento(id_evento: $id_evento, titulo: $titulo, descripcion: $descripcion, referencia: $referencia, usuario: $usuario, fecha: $fecha, politico: $politico) {
    id
  }
}
`;