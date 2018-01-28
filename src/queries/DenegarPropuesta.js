import gql from 'graphql-tag';

export default gql`
mutation DenegarSolicitudPropuesta($idPropuesta: ID){
  denegarSolicitudPropuesta(id_propuesta: $idPropuesta){
    id
  }
}
`;