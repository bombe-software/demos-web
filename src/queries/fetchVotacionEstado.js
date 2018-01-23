import gql from 'graphql-tag';

export default gql`
query Votacion_por_estado($estado: ID){
  votacion(estado: $estado) {
    estado {
      id
      estado
    }
    preferencias {
      politico {
        id
        nombre
      }
      usuarios {
        id
      }
    }
  }
}
`;