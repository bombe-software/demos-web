import gql from 'graphql-tag';

export default gql`
mutation AddPolitico($nombre: String, $cargo: String, $idEstado: ID){
  addPolitico(nombre: $nombre, cargo: $cargo, estado: $idEstado){
    nombre
  }
}
`;