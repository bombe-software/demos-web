import gql from 'graphql-tag';

export default gql`
{
  solicitudPoliticos {
    id
    nombre
    estudios {
      id
      titulo
    }
    usuario{
      id
    }
  }
}
`;