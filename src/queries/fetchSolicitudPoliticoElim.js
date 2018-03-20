import gql from 'graphql-tag';

export default gql`
{
  solicitudesDeletePolitico {
    id
    id_politico,
    id_usuario
}
}
`;