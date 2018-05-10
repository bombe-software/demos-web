import gql from 'graphql-tag';

export default gql`
mutation add_bug($titulo: String,$descripcion:String,$url: String){
    add_bug(titulo: $titulo, descripcion: $descripcion, url: $url){
      id
    }
    
  }
`;