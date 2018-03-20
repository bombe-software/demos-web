import gql from 'graphql-tag';

export default gql`
query SolicitudDeletePropuesta($id: ID!) {
  solicitudDeletePropuesta(id: $id) {
  	id_propuesta{
      id,
      titulo
    }
    id_usuario{
      nombre,
      avatar
    }
  }
}
`;