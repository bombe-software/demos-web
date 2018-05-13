import gql from 'graphql-tag';

export default gql`
mutation patch_add_evento($id_evento: ID){
    patch_add_evento(id_evento: $id_evento){
        id
    } 
}
`;