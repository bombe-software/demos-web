import gql from 'graphql-tag';

export default gql`
{
    modificar_eventos{
      fecha
      titulo
      descripcion
      referencia
      usuario{
        id
        nombre
        avatar
      }
      
    }
  
  }
`;