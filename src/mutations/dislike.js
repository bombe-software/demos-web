import gql from 'graphql-tag';

export default gql`
mutation dislike($id_propuesta: ID!, $id_usuario:ID!){
    dislike_propuesta(id_propuesta: $id_propuesta, id_usuario: $id_usuario){
      likes {
        id
      }
    }
}
`;