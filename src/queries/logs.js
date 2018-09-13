import gql from 'graphql-tag';

export default gql`
{
    logs {
      id
      ip
      metodo
      url
      query
      usuario {
        id
        nombre
      }
    }
  }
  
`;