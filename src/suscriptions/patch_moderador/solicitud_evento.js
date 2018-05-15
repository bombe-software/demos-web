import gql from 'graphql-tag';

export default gql`
subscription data {
    suscribe_to_patchd_evento_add_moderador  {
      id
      titulo
      fecha
      descripcion
      referencia
      usuario {
        id
        nombre
        avatar
      }
      politico {
        id
        nombre
      }
    }
}
`;