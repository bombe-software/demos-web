import gql from 'graphql-tag';

export default gql`
mutation DenegarEliminarSolicitudPolitico($id_solicitud:ID){
  denegarEliminarSolicitudPolitico(id_solicitud: $id_solicitud){
    id
  }
}
`;
