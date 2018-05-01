import gql from 'graphql-tag';

export default gql`
mutation confirm_email($email: String, $firma: String){
    confirm_email(email: $email, firma: $firma){
        id
    }
}
`;