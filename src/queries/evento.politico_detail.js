import gql from 'graphql-tag';

export default gql`
query data($id: ID!) {
    evento(id: $id) {
      id
      titulo
      descripcion
      fecha
      referencia
      usuario {
       nombre
      }
    }
  }
  

`;