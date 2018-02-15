import gql from 'graphql-tag';

export default gql`
query fetchPoliticoDetail($id: ID!) {
  politicosPorId(id: $id ){
    id,
    nombre,
    cargo,
    partido{
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
