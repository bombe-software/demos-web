import gql from 'graphql-tag';

export default gql`
subscription data {
  suscribe_to_politico_add {
    id
    nombre
    cargo
    partido {
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