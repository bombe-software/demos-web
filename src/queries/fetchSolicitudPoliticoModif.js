import gql from 'graphql-tag';

export default gql`
{
  solicitudesModificarPolitico {
    id,
    nombre
    cargo
    estado {
      id,
      nombre
    }
    estudios {
      id,
      titulo
    }
    usuario {
      id,
      nombre
    }
  }
}
`;