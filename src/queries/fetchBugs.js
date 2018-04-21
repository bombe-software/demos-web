import gql from 'graphql-tag';

export default gql`
{
    bugs {
      id
      titulo
      descripcion
      url
    }
  }
  
`;