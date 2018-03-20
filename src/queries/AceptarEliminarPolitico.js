import gql from 'graphql-tag';

export default gql`
mutation AceptarEliminarEvento($id_solicitud:ID){
  aceptarEliminarEvento(id_solicutd: $id_solicitud){
    id
  }
}
`;