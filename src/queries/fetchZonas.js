import gql from 'graphql-tag';

export default gql`
{
  zonas{
    zona,
    estados{
        id,
        estado
    }
  }
  
}
`;