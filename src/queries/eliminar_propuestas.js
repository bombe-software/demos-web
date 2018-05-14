import gql from 'graphql-tag';

export default gql`
{
  eliminar_propuestas {
    id
    propuesta {
      id
      titulo
      descripcion
    }
    usuario {
      id
      nombre
      avatar
    }
  }
}

`;