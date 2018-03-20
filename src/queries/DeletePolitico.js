import gql from 'graphql-tag';

export default gql`
mutation DeletePolitico($politico: ID!, $usuario: ID!){
  deletePolitico(id_politico: $politico, id_usuario: $usuario){
    id
  }
}
`;