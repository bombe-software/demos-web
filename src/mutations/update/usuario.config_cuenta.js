import gql from 'graphql-tag';

export default gql`
mutation update_usuario($id: ID!, $avatar:String, $password: String, $nombre: String){
    update_usuario(id: $id, avatar: $avatar, password: $password, nombre: $nombre){
        id
    }
}
`;