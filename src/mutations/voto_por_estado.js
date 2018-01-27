import gql from 'graphql-tag';

export default gql`
mutation Voto_estado($id_usuario: ID, $id_politico:ID, $id_votacion: ID ){
  voto_estado(
    id_usuario: $id_usuario,
    id_politico: $id_politico,
    id_votacion: $id_votacion
  ){
    id
    estado {
      id
    }
    preferencias{
      id
      politico {
        id
      }
      usuarios{
        id
      }
    }
  } 
}
`;