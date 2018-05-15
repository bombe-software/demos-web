import gql from 'graphql-tag';

export default gql`
subscription data {
    suscribe_to_patch_evento_update_moderador  {
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