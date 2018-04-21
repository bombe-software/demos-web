import gql from 'graphql-tag';

export default gql`
{
    usuarios{
        id
        email
        puntos
    }
}
`;