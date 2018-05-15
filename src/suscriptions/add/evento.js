import gql from 'graphql-tag';

export default gql`
subscription data {
  suscribe_to_evento_add {
    id
    titulo
    fecha
    descripcion
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