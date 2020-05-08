import { gql } from 'apollo-boost';
import axios from 'axios';

const addUserMutation = gql`
mutation ($firstname: String!, $lastname: String!, $email: String!) {
    addUser(firstname: $firstname, lastname: $lastname, email: $email) {
        id,
        firstname,
        lastname,
        email,
        sold
    }
}
`
export { addUserMutation };