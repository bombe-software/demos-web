import gql from 'graphql-tag';

export default gql`
{
	zonas{
    id
    zona
    estados {
      id
      estado
    }
  }
}
`;