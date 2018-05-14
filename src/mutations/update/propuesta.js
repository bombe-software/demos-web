import gql from 'graphql-tag';

export default gql`
mutation update_propuesta2($id_propuesta: ID, $usuario: ID, $politico: ID, $fecha: String, $descripcion: String, $titulo: String, $tipo_propuesta: ID, $referencia: String) {
  update_propuesta(id_propuesta: $id_propuesta, usuario: $usuario, politico: $politico, fecha: $fecha, descripcion: $descripcion, titulo: $titulo, tipo_propuesta: $tipo_propuesta, referencia: $referencia) {
    id
  }
}
`;