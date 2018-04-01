import gql from 'graphql-tag';

export default gql`
mutation DenegarSolicitudPolitico($idPolitico: ID){
  denegarSolicitudPolitico(id_politico: $idPolitico){
    id
  }
}
`;