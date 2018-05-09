import gql from 'graphql-tag';

export default gql`
query data($id: ID!) {
  propuesta(id: $id) {
    id
    titulo
    descripcion
    fecha
    referencia
    tipo_propuesta {
      id,
      tipo
    }
		usuario{
      id
      nombre 
    }
  }
}
`;