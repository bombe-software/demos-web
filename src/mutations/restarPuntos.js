
import gql from 'graphql-tag';

export default gql`
mutation restarPuntosUsuario($id_usuario:ID){
	restarPuntosUsuario(id_usuario: $id_usuario){
    id
  }
}
`;