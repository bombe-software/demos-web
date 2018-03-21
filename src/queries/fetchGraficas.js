import gql from 'graphql-tag';

export default gql`
{
    propuestas{
      tipo_propuesta {
        tipo
      }
      likes {
        id
      }
    }
    partidos{
      id
      nombre
      integrantes{
        id
      }
    }
    usuarios{
      id
         localidad {
           id
           nombre
         }
    }
    preferencias{
        id
      politico{
        id
        nombre
      }    
      usuarios{
        id
      }
    }
}
`;