import gql from 'graphql-tag';

export default gql`
query SolicitudModificarEvento($id: ID!){
  solicitudModificarEvento(id: $id){
    id,
    id_evento,
    fecha,
    titulo,
    descripcion,
    referencia,
    usuario {
      id
      nombre
      avatar
    }
    }
}
`;