import gql from 'graphql-tag';

export default gql`
mutation DenegarSolicitudDeletePropuesta($id_solicitud:ID){
  denegarSolicitudDeletePropuesta(id_solicitud: $id_solicitud){
    id
  }
}
`;
