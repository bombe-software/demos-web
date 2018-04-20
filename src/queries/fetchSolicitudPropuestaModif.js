import gql from 'graphql-tag';

export default gql`
{
  solicitudesModificarPropuesta{
    id,
    titulo,
    descripcion
    usuario{
      id,
      puntos
    }
  }
}
`;
