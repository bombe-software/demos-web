import gql from 'graphql-tag';

export default gql`
subscription data {
    suscribe_to_patch_propuesta_delete_moderador  {
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