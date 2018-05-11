
  import gql from 'graphql-tag';

export default gql`
{
    eliminar_politicos{
      politico{
        id
        nombre
      }
      usuario{
        id
        nombre
        avatar
      }
    }
  }
`;