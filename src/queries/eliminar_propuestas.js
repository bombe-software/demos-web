import gql from 'graphql-tag';

export default gql`
{
    eliminar_propuestas{
      id
      propuesta{
        id
        titulo
      }
      usuario{
        id
        nombre
        avatar
      }
    }
  }
`;