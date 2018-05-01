import gql from 'graphql-tag';

export default gql`
{
    eventos
    {
      id
      titulo
      descripcion
      politico {
        id
        nombre
      }
      fecha
    }
  }
`;