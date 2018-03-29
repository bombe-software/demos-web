import gql from 'graphql-tag';

export default gql`
mutation AceptarSolicitudDeletePolitico($idPolitico:ID){
  aceptarSolicitudDeletePolitico(id_politico: $idPolitico){
    id
  }
}
`;