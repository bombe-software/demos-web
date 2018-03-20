import gql from 'graphql-tag';

export default gql`
mutation AceptarSolicitudDeletePropuesta($id_solicitud:ID){
  aceptarSolicitudDeletePropuesta(id_solicitud: $id_solicitud){
    id
  }
}
`;