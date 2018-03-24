import gql from 'graphql-tag';

export default gql`
{
  solicitudesDeleteEvento{
    id,
    id_usuario{
      id,
      nombre
    },
    id_evento{
      id,
      titulo
    }
  }
}
`;