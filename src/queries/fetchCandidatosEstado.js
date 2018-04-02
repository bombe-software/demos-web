import gql from 'graphql-tag';

export default gql`
query Estado($id_estado:ID){
    estado(id: $id_estado){
      id
      candidatos {
          id
          nombre
          partido {
              id
              nombre
          }
      }
    }
}
`;