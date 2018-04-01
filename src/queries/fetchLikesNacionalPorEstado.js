import gql from 'graphql-tag';

export default gql`
query LikesNacionalPorEstado($id_estado: ID!){
    likes_nacionalPorEstado(id_estado: $id_estado){
      id
      politico{
        id
        nombre
      }
      usuarios{
        id
      }
      estado{
        id
        nombre
      }
    }
  }
`;
