import gql from 'graphql-tag';

export default gql`
{
    solicitud_eventos {
      id
      titulo
      fecha
      descripcion
      referencia
      usuario {
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