import gql from 'graphql-tag';

export default gql`
{
  solicitudesDeletePolitico{
    id,
    id_usuario{
      id
      nombre,
      puntos
    },
    id_politico{
      id
      nombre
    }
  }
}
`;