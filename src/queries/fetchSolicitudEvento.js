import gql from 'graphql-tag';

export default gql`
{
  solicitudEventos {
    id
    titulo
    politico{
      id
    }
  }
}
`;