import gql from 'graphql-tag';

export default gql`
mutation AceptarModificarSolicitudPropuesta($id_solicitud:ID){
  aceptarModificarSolicitudPropuesta(id_solicitud: $id_solicitud){
    id
  }
}
`;
