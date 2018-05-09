
import gql from 'graphql-tag';
export default gql`
mutation estatal_voto(
    $id_votacion: ID,
    $id_usuario: ID,
    $id_preferencia: ID,
    $id_estado: ID){
      estatal_voto(id_votacion: $id_votacion, id_usuario: $id_usuario, id_preferencia: $id_preferencia, id_estado:$id_estado){
        id
      }
    }
`;
