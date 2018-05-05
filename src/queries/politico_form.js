import gql from 'graphql-tag';

export default gql`
{
  usuario_in {
    id
  }
  partidos {
    id
    nombre
  }
  estados {
    id
    nombre
  }
  grado_academicos {
    id
    grado
  }
  lugar_estudios {
    id
    nombre
  }
}
`;