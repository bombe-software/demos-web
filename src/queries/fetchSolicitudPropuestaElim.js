import gql from 'graphql-tag';

export default gql`
{
  solicitudesDeletePropuesta{
    id,
    id_usuario{
      id,
      nombre,
      puntos
    },
    id_propuesta{
      id,
      titulo
    }
  }
}
`;