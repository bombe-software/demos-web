import gql from 'graphql-tag';

export default gql`
query SolicitudDeletePolitico($id: ID!) {
  solicitudDeletePolitico(id: $id) {
  	id_politico{
      nombre
    }
    id_usuario{
      nombre,
      avatar
    }
  }
}
`;