import gql from 'graphql-tag';

export default gql`
mutation patchd_add_evento($id_evento: ID){
    patchd_add_evento(id_evento: $id_evento){
      id
        } 
    }
`;