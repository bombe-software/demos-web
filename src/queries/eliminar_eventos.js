import gql from 'graphql-tag';

export default gql`
{
    eliminar_eventos{
      id
      evento{
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