import gql from 'graphql-tag';

export default gql`
{
  solicitudesModificarPolitico {
    id
    nombre
    cargo
    estado {
      nombre
      id
    }
    estudios {
      id
      titulo
    }
    usuario {
      nombre
    }
  }
}
`;