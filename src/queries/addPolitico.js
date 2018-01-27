import gql from 'graphql-tag';

export default gql`
mutation AddPolitico($nombre: String, $cargo: String, $partido: ID, 
$estado: ID, $lugar_estudio: ID, $grado_academico: ID, $titulo: String){
  addPolitico(
  nombre: $nombre,
  cargo: $cargo, partido: $partido, 
  estado: $estado, 
  lugar_estudio: $lugar_estudio,
  grado_academico: $grado_academico,
  titulo: $titulo
  
  ){
    nombre
  }
}
`;