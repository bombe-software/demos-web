import gql from 'graphql-tag';

export default gql`
subscription data {
    suscribe_to_patch_politico_delete_moderador  {
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