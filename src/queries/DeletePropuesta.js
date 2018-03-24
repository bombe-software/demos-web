import gql from 'graphql-tag';

export default gql`
mutation DeletePropuesta($id_propuesta: ID!, $id_usuario: ID!){
  deletePropuesta(id_propuesta: $id_propuesta, id_usuario: $id_usuario){
    id
  }
}
`;