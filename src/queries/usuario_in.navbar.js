import gql from 'graphql-tag';

export default gql`
{
    usuario_in {
      id
      nombre
      avatar
      tipo_usuario {
        id
      }
    }
  }
`;
/**
 * RefetchQueries Component:
 * -ConfigForm
 * -Login
 */