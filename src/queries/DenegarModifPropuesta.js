import gql from 'graphql-tag';

export default gql`
mutation DenegarModificarSolicitudPropuesta($id_solicitud:ID){
  denegarModificarSolicitudPropuesta(id_solicitud: $id_solicitud){
    id
  }
}
`;
