
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
      estado{
        id
        nombre
      }
      estudios{
        id
        titulo
        grado_academico{
         id
         grado 
        }
        lugar_estudio{
          id
          nombre
        }
      }
      referencia
    }
  }
`;