import gql from 'graphql-tag';

export default gql`
  mutation modifyPolitico(
  $id_politico: ID
  $nombre: String
  $cargo: String
  $partido: ID
  $estado: ID
  $estudios: ID
  $lugar_estudio: ID
  $grado_academico: ID
  $titulo: String
  $usuario: ID
  $referencia: String
  ){
    modifyPolitico(
      id_politico: $id_politico,
      nombre: $nombre,
      cargo: $cargo,
      partido: $partido,
      estado: $estado,
      estudios: $estudios,
      lugar_estudio: $lugar_estudio,
      grado_academico: $grado_academico,
      titulo: $titulo,
      usuario: $usuario,
      referencia: $referencia
  ){
    id
    nombre
    estudios {
      id
      titulo
    }
  }
}
`;