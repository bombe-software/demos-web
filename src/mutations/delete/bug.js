import gql from 'graphql-tag';

export default gql`
mutation delete_bug($id_bug: ID!){
    delete_bug(id_bug: $id_bug){
        id
    }
}`