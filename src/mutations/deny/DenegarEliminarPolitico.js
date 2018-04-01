import gql from 'graphql-tag';

export default gql`
mutation DenegarSolicitudDeletePolitico($id_solicitud:ID){
  denegarSolicitudDeletePolitico(id_solicitud: $id_solicitud){
    id
  }
}
`;
