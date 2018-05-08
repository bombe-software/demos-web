import gql from 'graphql-tag';

export default gql`
query data($id_estado: ID!){
    like_nacionals_by_id_estado(id_estado: $id_estado){
      id
      politico{
        id
        nombre
        partido {
          id
          nombre
          color
        }
      }
      usuarios{
        id
      }
    }
  }
`;