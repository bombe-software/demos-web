import gql from 'graphql-tag';

export default gql`
subscription data {
  suscribe_to_evento_delete {
    id
    evento {
      id
      titulo
      descripcion
    }
    usuario {
      id
      nombre
      avatar
    }
  }
}
`;