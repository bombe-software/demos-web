import gql from 'graphql-tag';

export default gql`
mutation AceptarSolicitudDeletePolitico($id_solicitud:ID){
  aceptarSolicitudDeletePolitico(id_solicitud: $id_solicitud){
    id
  }
}
`;