import gql from 'graphql-tag';

export default gql`
mutation AceptarSolicitudEvento($idEvento:ID){
  aceptarSolicitudEvento(id_evento: $idEvento){
    id
  }
}
`;