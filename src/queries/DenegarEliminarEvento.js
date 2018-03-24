import gql from 'graphql-tag';

export default gql`
mutation DenegarSolicitudDeleteEvento($id_solicitud:ID){
  denegarSolicitudDeleteEvento(id_solicitud: $id_solicitud){
    id
  }
}
`;
