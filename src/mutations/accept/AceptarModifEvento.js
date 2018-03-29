import gql from 'graphql-tag';

export default gql`
mutation AceptarModificarSolicitudEvento($id_solicitud: ID){
   aceptarModificarSolicitudEvento(id_solicitud: $id_solicitud){
    id 
  }
} 
`;