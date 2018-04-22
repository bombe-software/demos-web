import gql from 'graphql-tag';

export default gql`
mutation deleteBug($id_bug: ID!){
    deleteBug(id_bug: $id_bug){
        id
    }
}`