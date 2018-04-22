import gql from 'graphql-tag';

export default gql`
{
    propuestas
    {
      id
      titulo
      descripcion
      politico {
        id
        nombre
      }
      tipo_propuesta {
        id
        tipo
      }
    }
  }
`;