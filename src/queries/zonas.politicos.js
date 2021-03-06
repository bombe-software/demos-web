import gql from 'graphql-tag';

export default gql`
{
  zonas {
    id
    nombre
    estados {
      id
      nombre
      candidatos {
        id
        nombre
        partido {
          id
          nombre
        }
      }
      funcionarios {
        id
        nombre
        partido {
          nombre
        }
      }
    }
  }
}
`;