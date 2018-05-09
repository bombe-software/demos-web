import gql from 'graphql-tag';

export default gql`
query VotacionPorEstado($id_estado: ID){
  votacion(estado: $id_estado){
    id
    estado {
      id
    }
    preferencias{
      id
      politico {
        id
        nombre
      }
      usuarios{
        id
        nombre
      }
    }
  }
}
`;