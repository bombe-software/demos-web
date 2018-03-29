import gql from 'graphql-tag';

export default gql`
mutation AceptarSolicitudPropuesta($idPropuesta:ID){
  aceptarSolicitudPropuesta(id_propuesta: $idPropuesta){
    id
  }
}
`;