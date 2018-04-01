import gql from 'graphql-tag';

export default gql`
query SolicitudModificarPropuesta($id: ID!){
  solicitudModificarPropuesta(id: $id){
    id,
    fecha,
    titulo,
    descripcion,
    tipo_propuesta{
      id,
      tipo
    }
    politico{
      id
      nombre
    }
    referencia,
    usuario {
      id
      nombre
      avatar
    }
  }
}
`;