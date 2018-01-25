import gql from 'graphql-tag';

export default gql`
{
    usuario{
      id
      nombre
      email
      avatar
      localidad
    } 
}
`;