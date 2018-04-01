import gql from 'graphql-tag';

export default gql`
query SolicitudModificarPolitico($id: ID!){
  solicitudModificarPolitico(id: $id){
    id
    nombre
    cargo
    usuario {
      id
      nombre
      avatar
    }
    partido {
      nombre
    }
    estado {
      id
      nombre
    }
    estudios {
      id
      titulo
      grado_academico {
        id
        grado
      }
      lugar_estudio {
        id
        nombre
      }
    }
    referencia
  }
}
`;