import gql from 'graphql-tag';

export default gql`
{
  solicitudesDeletePropuesta{
    id,
    id_usuario{
      id,
      nombre
    },
    id_propuesta{
      id,
      titulo
    }
  }
}
`;