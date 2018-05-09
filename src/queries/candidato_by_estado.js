import gql from 'graphql-tag';

export default gql`
query candidato_by_estado($id_estado:ID){
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