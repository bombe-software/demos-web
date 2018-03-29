import gql from 'graphql-tag';

export default gql`
query fetchPoliticoPerfil($id: ID!) {
  politicosPorId(id: $id ){
    id,
    nombre,
    cargo,
    estado{id}
    partido{
        id,
        nombre
    },
    estudios{
        id,
        titulo,
        grado_academico {
            id,
            grado
        },
        lugar_estudio {
            id,
            nombre
        }
    }
}
} 
`;
