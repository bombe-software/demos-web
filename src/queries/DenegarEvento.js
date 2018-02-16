import gql from 'graphql-tag';

export default gql`
mutation DenegarSolicitudEvento($idEvento: ID){
  denegarSolicitudEvento(id_evento: $idEvento){
    id
  }
}
`;