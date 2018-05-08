import gql from 'graphql-tag';

export default gql`
mutation nacional_voto($id_politico: ID, $id_usuario: ID, $id_estado: ID!) {
  nacional_voto(id_politico: $id_politico, id_usuario: $id_usuario, id_estado: $id_estado) {
    id
  }
}
`;
