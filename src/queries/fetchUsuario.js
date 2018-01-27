import gql from 'graphql-tag';

export default gql`
{
    usuario{
        id,
        nombre,
        email,
        localidad,
        puntos,
        fecha_registro,
        avatar
    } 
}
`;