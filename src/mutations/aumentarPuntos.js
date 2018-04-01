
import gql from 'graphql-tag';

export default gql`
mutation aumentarPuntosUsuario($id_usuario:ID){
	aumentarPuntosUsuario(id_usuario: $id_usuario){
    id
  }
}
`;