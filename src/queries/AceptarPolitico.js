import gql from 'graphql-tag';

export default gql`
mutation AceptarSolicitudPolitico($idPolitico:ID){
  aceptarSolicitudPolitico(id_politico: $idPolitico){
    id
  }
}
`;