import gql from 'graphql-tag';

export default gql`
subscription data {
    suscribe_to_patchd_propuesta_update {
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