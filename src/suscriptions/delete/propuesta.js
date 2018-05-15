import gql from 'graphql-tag';

export default gql`
subscription data {
  suscribe_to_propuesta_delete {
    id
    propuesta {
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