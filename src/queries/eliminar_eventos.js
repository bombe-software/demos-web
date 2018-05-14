import gql from 'graphql-tag';

export default gql`
{
    eliminar_eventos{
      id
      evento{
        id
        titulo
        descripcion
      }
      usuario{
        id
        nombre
        avatar
      }
    }
  }
`;