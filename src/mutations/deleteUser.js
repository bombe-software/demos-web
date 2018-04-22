import gql from 'graphql-tag';

export default gql`
mutation deleteUser($id_usuario: ID){
    deleteUser(id_usuario: $id_usuario){
        id
    }
}`