// tslint:disable
// this is an auto generated file. This will be overwritten

export const fetchGristTest = /* GraphQL */ `
  query FetchGristTest($id: ID!) {
    fetchGristTest(id: $id) {
      id
      maltId
      createdAt
      beer
      topRoller
      bottomRoller
      totalWeight
      topSeiveWeight
      thirtyWeight
      sixtyWeight
      panWeight
    }
  }
`;
export const fetchMalt = /* GraphQL */ `
  query FetchMalt($id: ID!) {
    fetchMalt(id: $id) {
      id
      name
      topRoller
      bottomRoller
      gristTests {
        id
        maltId
        createdAt
        beer
        topRoller
        bottomRoller
        totalWeight
        topSeiveWeight
        thirtyWeight
        sixtyWeight
        panWeight
      }
    }
  }
`;
export const getMalt = /* GraphQL */ `
  query GetMalt($id: ID!) {
    getMalt(id: $id) {
      id
      name
      topRoller
      bottomRoller
      gristTests {
        id
        maltId
        createdAt
        beer
        topRoller
        bottomRoller
        totalWeight
        topSeiveWeight
        thirtyWeight
        sixtyWeight
        panWeight
      }
    }
  }
`;
export const listMalts = /* GraphQL */ `
  query ListMalts(
    $filter: TableMaltFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMalts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        topRoller
        bottomRoller
      }
      nextToken
    }
  }
`;
export const getGristTest = /* GraphQL */ `
  query GetGristTest($id: ID!) {
    getGristTest(id: $id) {
      id
      maltId
      createdAt
      beer
      topRoller
      bottomRoller
      totalWeight
      topSeiveWeight
      thirtyWeight
      sixtyWeight
      panWeight
    }
  }
`;
export const listGristTests = /* GraphQL */ `
  query ListGristTests(
    $maltId: ID!
    $filter: TableGristTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGristTests(
      maltId: $maltId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        maltId
        createdAt
        beer
        topRoller
        bottomRoller
        totalWeight
        topSeiveWeight
        thirtyWeight
        sixtyWeight
        panWeight
      }
      nextToken
    }
  }
`;
