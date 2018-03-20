import gql from 'graphql-tag';

export default gql`
mutation DenegarModificarSolicitudPolitico($id_solicitud:ID){
  denegarModificarSolicitudPolitico(id_solicitud: $id_solicitud){
    id
  }
}
`;
