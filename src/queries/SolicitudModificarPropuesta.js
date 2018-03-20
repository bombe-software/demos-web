import gql from 'graphql-tag';

export default gql`
query SolicitudModificarPropuesta($id: ID!){
  solicitudModificarPropuesta(id: $id){
    id,
    id_propuesta,
    fecha,
    titulo,
    descripcion,
    tipo_propuesta{
      tipo
    }
    politico{
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