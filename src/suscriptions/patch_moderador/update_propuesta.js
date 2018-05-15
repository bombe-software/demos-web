import gql from 'graphql-tag';

export default gql`
subscription data {
    suscribe_to_patch_propuesta_update_moderador  {
      id
      fecha
      descripcion
      titulo
      tipo_propuesta {
        id
        tipo
      }
      usuario {
        id
        nombre
        avatar
      }
    }
  }
`;