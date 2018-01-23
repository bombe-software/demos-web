import gql from 'graphql-tag';

export default gql`
{
  politicos(id: $id){
    id,
    nombre,
    partido {
      id
    },
    tipo_politico {
      id,
      tipo
    },
    estado {
      id,
      estado
    },
    eventos {
      id
    },
    estudios {
      id,
      titulo,
      grado_academico{ id,grado }
    },
    propuestas {
      id
    }
    }
  }
`;
