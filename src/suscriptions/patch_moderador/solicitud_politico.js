import gql from 'graphql-tag';

export default gql`
subscription data {
    suscribe_to_patch_politico_add_moderador  {
      id
      nombre
      cargo
      partido {
        id
        nombre
      }
      usuario {
        id
        nombre
        avatar
      }
      referencia
    }
}
`;