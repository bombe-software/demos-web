import gql from 'graphql-tag';

export default gql`
subscription data {
  suscribe_to_propuesta_add {
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