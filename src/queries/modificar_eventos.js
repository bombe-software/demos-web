import gql from 'graphql-tag';

export default gql`
{
    modificar_eventos{
      id
      fecha
      titulo
      descripcion
      referencia
      usuario{
        id
        nombre
        avatar
      }
      politico {
        id
        nombre
      }
    }
  }
`;