import gql from 'graphql-tag';

export default gql`
subscription data {
    suscribe_to_patchd_evento_update {
      id
      fecha
      titulo
      descripcion
      referencia
      usuario {
        id
        nombre
        avatar
      }
    }
}
`;