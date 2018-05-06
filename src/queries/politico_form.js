import gql from 'graphql-tag';

export default gql`
{
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