import gql from 'graphql-tag';

export default gql`

{
  politicos{
    id,
    nombre, 
    tipo_politico{
        id,
        tipo
      }
     estado{
      id,
      estado,
     

    }
   }
}
`;
