import gql from 'graphql-tag';

export default gql`
mutation AceptarModificarSolicitudPolitico($id_solicitud:ID){
  aceptarModificarSolicitudPolitico(id_solicitud: $id_solicitud){
    id
  }
}
`;
