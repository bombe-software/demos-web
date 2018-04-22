import gql from 'graphql-tag';

export default gql`
mutation addBug($titulo: String!, $descripcion:String!, $url: String!){
    addBug(titulo: $titulo, descripcion: $descripcion, url: $url){
      id
    }
}`;