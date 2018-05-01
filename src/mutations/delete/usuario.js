import gql from 'graphql-tag';

export default gql`
mutation delete_usuario($id_usuario: ID){
    delete_usuario(id_usuario: $id_usuario){
        id
    }
}
`;