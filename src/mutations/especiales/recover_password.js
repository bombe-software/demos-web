import gql from 'graphql-tag';

export default gql`
mutation recover_password($email: String){
    recover_password(email: $email)
}
`;