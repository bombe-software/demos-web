import gql from 'graphql-tag';

export default gql`
subscription data {
    suscribe_to_patch_evento_delete_moderador {
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