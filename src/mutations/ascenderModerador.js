import gql from 'graphql-tag';
export default gql`
mutation ascenderModerador($id_usuario:ID){
	ascenderModerador(id_usuario: $id_usuario){
    id
  }
}
`;