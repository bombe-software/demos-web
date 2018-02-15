import gql from 'graphql-tag';

export default gql`
query fetchPropuesta($id: ID!){
    propuesta(id: $id){
      id
      titulo
      descripcion
      referencia
      politico {
        id
      }
      tipo_propuesta {
        tipo
        id
      }
      usuario {
        id
        nombre
      }
    }
  }
`;