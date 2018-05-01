import gql from 'graphql-tag';

export default gql`
{
    usuarios {
      id
      email
      puntos
      avatar
      nombre
      tipo_usuario {
        id
        tipo
      }
    }
}
`;