
import gql from 'graphql-tag';

export default gql`
{
    solicitud_politicos {
      id
      nombre
      cargo
      partido{
        id
        nombre
      }
      usuario {
        id
        nombre
        avatar
      }
      referencia
    }
  }
`;