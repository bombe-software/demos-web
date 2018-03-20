import gql from 'graphql-tag';

export default gql`
query SolicitudDeleteEvento($id: ID!) {
  solicitudDeleteEvento(id: $id) {
  	id_evento{
      titulo
    }
    id_usuario{
      nombre,
      avatar
    }
  }
}
`;