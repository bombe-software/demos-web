import gql from 'graphql-tag';

export default gql`
mutation DenegarModificarEvento($id_solicitud: ID){
   denegarModificarSolicitudEvento(id_solicitud: $id_solicitud){
    id 
  }
} 
`;