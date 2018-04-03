import gql from 'graphql-tag';

export default gql`
{
  solicitudesDeleteEvento{
    id,
    id_usuario{
      id,
      nombre,
      puntos
    },
    id_evento{
      id,
      titulo
    }
  }
}
`;