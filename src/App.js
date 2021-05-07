import React from 'react'
import { Container } from 'reactstrap'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'
import UserForm from './UserForm'

const restLink = new RestLink({ uri: "https://jsonplaceholder.typicode.com/" })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
})

function App() {
  return (
    <Container className="mt-5">
      <UserForm />
    </Container>
  );
}

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default ApolloApp