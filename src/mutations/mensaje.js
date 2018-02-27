import gql from 'graphql-tag';

export default gql`
mutation Mensaje($mensajeUser: String){
  mensaje(mensajeUser: $mensajeUser)
}
`;