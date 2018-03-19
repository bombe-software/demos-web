import gql from 'graphql-tag';

export default gql`
mutation AceptarModificarSolicitudPolitico($id_politico:ID){
  aceptarModificarSolicitudPolitico(id_politico: $id_politico){
    id
  }
}
`;
