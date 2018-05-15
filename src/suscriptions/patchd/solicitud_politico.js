import gql from 'graphql-tag';

export default gql`
mutation patchd_add_politico($id_politico: ID){
    patchd_add_politico(id_politico: $id_politico){
      id
        } 
    }
`;