import gql from 'graphql-tag';

export default gql`
{
    propuestas{
      id
      titulo
      tipo_propuesta {
        tipo
      }
      likes {
        id
      }
    	politico {
        id
        cargo
        nombre
        estado {
          id
        }
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