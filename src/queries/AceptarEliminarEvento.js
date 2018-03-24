import gql from 'graphql-tag';

export default gql`
mutation AceptarSolicitudDeleteEvento($id_solicitud:ID){
  aceptarSolicitudDeleteEvento(id_solicitud: $id_solicitud){
    id
  }
}
`;