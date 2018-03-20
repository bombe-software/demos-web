import gql from 'graphql-tag';

export default gql`
{
  solicitudesDeletePolitico {
    id
    id_politico{
    	id
    	nombre
    },
    id_usuario{
    	id
    	nombre
    }
}
}
`;