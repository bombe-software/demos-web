import gql from 'graphql-tag';

export default gql`
mutation Voto_nacional($id_politico: ID, $id_usuario: ID, $id_estado: ID ){
  votarNacional(id_politico: $id_politico, id_usuario: $id_usuario, id_estado: $id_estado){
    id
    politico{
      id
    }
    usuarios{
      id
    }
    estado{
      id
    }
  }
}
`;