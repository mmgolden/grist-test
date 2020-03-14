// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateMalt = /* GraphQL */ `
  subscription OnCreateMalt(
    $id: ID
    $name: String
    $topRoller: Float
    $bottomRoller: Float
  ) {
    onCreateMalt(
      id: $id
      name: $name
      topRoller: $topRoller
      bottomRoller: $bottomRoller
    ) {
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
export const onUpdateMalt = /* GraphQL */ `
  subscription OnUpdateMalt(
    $id: ID
    $name: String
    $topRoller: Float
    $bottomRoller: Float
  ) {
    onUpdateMalt(
      id: $id
      name: $name
      topRoller: $topRoller
      bottomRoller: $bottomRoller
    ) {
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
export const onDeleteMalt = /* GraphQL */ `
  subscription OnDeleteMalt(
    $id: ID
    $name: String
    $topRoller: Float
    $bottomRoller: Float
  ) {
    onDeleteMalt(
      id: $id
      name: $name
      topRoller: $topRoller
      bottomRoller: $bottomRoller
    ) {
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
export const onCreateGristTest = /* GraphQL */ `
  subscription OnCreateGristTest(
    $id: ID
    $maltId: ID
    $createdAt: AWSDateTime
    $beer: String
    $topRoller: Float
  ) {
    onCreateGristTest(
      id: $id
      maltId: $maltId
      createdAt: $createdAt
      beer: $beer
      topRoller: $topRoller
    ) {
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
export const onUpdateGristTest = /* GraphQL */ `
  subscription OnUpdateGristTest(
    $id: ID
    $maltId: ID
    $createdAt: AWSDateTime
    $beer: String
    $topRoller: Float
  ) {
    onUpdateGristTest(
      id: $id
      maltId: $maltId
      createdAt: $createdAt
      beer: $beer
      topRoller: $topRoller
    ) {
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
export const onDeleteGristTest = /* GraphQL */ `
  subscription OnDeleteGristTest(
    $id: ID
    $maltId: ID
    $createdAt: AWSDateTime
    $beer: String
    $topRoller: Float
  ) {
    onDeleteGristTest(
      id: $id
      maltId: $maltId
      createdAt: $createdAt
      beer: $beer
      topRoller: $topRoller
    ) {
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
