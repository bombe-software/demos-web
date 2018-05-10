import gql from 'graphql-tag';

export default gql`
{
  solicitud_propuestas {
    id
    titulo
    fecha
    descripcion
    tipo_propuesta {
      id
      tipo
    }
    referencia
    usuario {
      id
      nombre
      avatar
    }
    politico {
      id
      nombre
    }
  }
}
`;