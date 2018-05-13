import gql from 'graphql-tag';

export default gql`
{
    modificar_propuestas{
      id
      fecha
      descripcion
      titulo
      tipo_propuesta{
        id
        tipo
      }
      usuario{
        id
        nombre
        avatar
      }
    }
  }
`;