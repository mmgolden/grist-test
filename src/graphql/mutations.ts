// tslint:disable
// this is an auto generated file. This will be overwritten

export const createMalt = /* GraphQL */ `
  mutation CreateMalt($input: CreateMaltInput!) {
    createMalt(input: $input) {
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
export const updateMalt = /* GraphQL */ `
  mutation UpdateMalt($input: UpdateMaltInput!) {
    updateMalt(input: $input) {
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
export const deleteMalt = /* GraphQL */ `
  mutation DeleteMalt($input: DeleteMaltInput!) {
    deleteMalt(input: $input) {
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
export const createGristTest = /* GraphQL */ `
  mutation CreateGristTest($input: CreateGristTestInput!) {
    createGristTest(input: $input) {
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
export const updateGristTest = /* GraphQL */ `
  mutation UpdateGristTest($input: UpdateGristTestInput!) {
    updateGristTest(input: $input) {
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
export const deleteGristTest = /* GraphQL */ `
  mutation DeleteGristTest($input: DeleteGristTestInput!) {
    deleteGristTest(input: $input) {
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
