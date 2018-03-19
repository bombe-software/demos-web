import gql from 'graphql-tag';

export default gql`
mutation DenegarModificarSolicitudPolitico($id_politico:ID){
  denegarModificarSolicitudPolitico(id_politico: $id_politico){
    id
  }
}
`;
