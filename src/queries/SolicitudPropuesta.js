import gql from 'graphql-tag';

export default gql`
{
    solicitudPropuestas {
      id
      titulo
      descripcion
      usuario {
        id
        nombre
      }
      fecha
      tipo_propuesta {
        tipo
      }
      referencia
      politico {
        id
        nombre
        cargo
      }
    }
  }
`;
