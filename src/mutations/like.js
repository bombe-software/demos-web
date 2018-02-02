import gql from 'graphql-tag';

export default gql`
mutation like($id_propuesta: ID!, $id_usuario:ID!){
    like_propuesta(id_propuesta: $id_propuesta, id_usuario: $id_usuario){
      likes {
        id
      }
    }
}
`;