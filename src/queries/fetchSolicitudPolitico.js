import gql from 'graphql-tag';

export default gql`
{
  solicitudPoliticos{
    id,
    nombre
    usuario
    {
      id,
      nombre
    }
  }
}
`;