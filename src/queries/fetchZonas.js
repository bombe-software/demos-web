import gql from 'graphql-tag';

export default gql`
{
	zonas{
    id,
    nombre,
    estados{
      nombre 
    }
  }
}
`;