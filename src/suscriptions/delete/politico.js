import gql from 'graphql-tag';

export default gql`
subscription data {
  suscribe_to_politico_delete {
    id
    politico {
      id
      nombre
    }
    usuario {
      id
      nombre
      avatar
    }
  }
}
`;