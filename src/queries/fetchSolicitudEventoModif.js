import gql from 'graphql-tag';

export default gql`
{
  solicitudesModificarEvento {
    id
    titulo
    politico{
      id
    }
    usuario{id}
  }
}
`;