import gql from 'graphql-tag';

export default gql`
mutation add_politico($nombre: String!, $cargo: String!, $partido: ID!, $estado: ID!, $lugar_estudio: ID!, $grado_academico: ID!, $titulo: String!, $usuario: ID!, $referencia: String!) {
  add_politico(nombre: $nombre, cargo: $cargo, partido: $partido, estado: $estado, lugar_estudio: $lugar_estudio, grado_academico: $grado_academico, titulo: $titulo, usuario: $usuario, referencia: $referencia) {
    id
  }
}
`;