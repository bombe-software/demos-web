import gql from 'graphql-tag';

export default gql`

{
  politicos{
    id,
    nombre,
    cargo,
    partido {
      id,
      nombre
    }
  }
}
`;
