import gql from 'graphql-tag';

export default gql`
query VotacionPorEstado($id_estado: ID){
  votacion(estado: $id_estado){
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