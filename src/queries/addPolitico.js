import gql from 'graphql-tag';

export default gql`
 
 mutation AddPolitico($nombre: String)
  {
    addPolitico(nombre: $nombre) 
    {
      nombre
    }
  }
  `;