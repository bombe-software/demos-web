import gql from 'graphql-tag';

export default gql`
query fetchPoliticoDetail($id: ID!) {
  politicosPorId(id: $id ){
    id,
    nombre,
    partido{
      nombre
    }
}
}

`;
