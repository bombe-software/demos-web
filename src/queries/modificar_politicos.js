import gql from 'graphql-tag';

export default gql`
{
    modificar_politicos{
      id
      politico{
        id
        nombre
      }
      nombre,
      cargo,
      usuario{
        id
        nombre
        avatar
      }
      partido{
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
