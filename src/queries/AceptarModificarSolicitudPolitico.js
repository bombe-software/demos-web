import gql from 'graphql-tag';

export default gql`
mutation AceptarModificarSolicitudPolitico($idPolitico:ID){
  aceptarModificarSolicitudPolitico(id_politico: $idPolitico){
    id
  }
}
`;