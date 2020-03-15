# Grist Test

Brewery app built with React Native and AWS AppSync. Grist analysis is the process of using stacked sieves with varying meshes to test malt output after milling (crushing the grain).

<img src="https://user-images.githubusercontent.com/14826719/76704692-225d3600-66b1-11ea-8d73-a70eb2fbaa9b.png" alt="Grist test screenshots" width="800px" />

## Features

- Create an account and reset password
- View, create, edit, and delete malts
- Create grist tests and view results

### Upcoming features

- Change email address
- Set target parameters
- View history of grist tests

## Technologies

- TypeScript
- React Native
- Apollo
- GraphQL
- AWS AppSync
- AWS Amplify
- React Navigation
- React Native Testing Library

## Getting started

You will need to create your own [AWS account](https://portal.aws.amazon.com/billing/signup#/start) (free).

1. Install the Amplify CLI

```
npm install -g @aws-amplify/cli
```

2. Clone the project

```
git clone https://github.com/mmgolden/grist-test.git
```

3. Install the dependencies

```
yarn
```

4. Delete the amplify folder

5. Configure the CLI with a user from your AWS account

```
amplify configure
```

Watch this [video](https://www.youtube.com/watch?v=fWbM5DLh25U) for a walkthrough on configuring the Amplify CLI.

6. In the root of the project directory, initialize the amplify project

```
amplify init
```

- Enter a name for the project: **grist-test**
- Enter a name for the environment: **develop**
- Choose your default editor: **Visual Studio Code**
- Choose the type of app you are building: **JavaScript**
- What JavaScript framework are you using? **React Native**
- Source directory path: **/**
- Distribution directory path: **/build**
- Build command: **npm run-script build**
- Start command: **npm run-script start**
- Do you want to use an AWS profile? **Y**
- Please choose the profile you want to use: **Default**

7. Add authentication

```
amplify add auth
```

- Do you want to use the default authentication and security configuration? **Default configuration**
- How do you want users to be able to sign in? **Email**
- Do you want to configure advanced settings? **No, I am done**

8. Push changes to the cloud

```
amplify push
```

9. Add AWS AppSync GraphQL API

```
amplify add api
```

- Please select from one of the below mentioned services: **GraphQL**
- Provide API name: **grist-test**
- Choose an authorization type for the API: **Amazon Cognito User Pool**

When prompted for the GraphQL schema, use the following schema:

```graphql
input CreateGristTestInput {
  maltId: ID!
  createdAt: AWSDateTime
  beer: String!
  topRoller: Float!
  bottomRoller: Float!
  totalWeight: Int!
  topSeiveWeight: Int!
  thirtyWeight: Int!
  sixtyWeight: Int!
  panWeight: Int!
}

input CreateMaltInput {
  name: String!
  topRoller: Float
  bottomRoller: Float
}

input DeleteGristTestInput {
  id: ID!
}

input DeleteMaltInput {
  id: ID!
}

type GristTest {
  id: ID!
  maltId: ID!
  createdAt: AWSDateTime
  beer: String!
  topRoller: Float!
  bottomRoller: Float!
  totalWeight: Int!
  topSeiveWeight: Int!
  thirtyWeight: Int!
  sixtyWeight: Int!
  panWeight: Int!
}

type GristTestConnection {
  items: [GristTest]
  nextToken: String
}

type Malt {
  id: ID!
  name: String!
  topRoller: Float
  bottomRoller: Float
  gristTests: [GristTest]
}

type MaltConnection {
  items: [Malt]
  nextToken: String
}

type Mutation {
  createMalt(input: CreateMaltInput!): Malt
  updateMalt(input: UpdateMaltInput!): Malt
  deleteMalt(input: DeleteMaltInput!): Malt
  createGristTest(input: CreateGristTestInput!): GristTest
  updateGristTest(input: UpdateGristTestInput!): GristTest
  deleteGristTest(input: DeleteGristTestInput!): GristTest
}

type Query {
  fetchGristTest(id: ID!): GristTest
  fetchMalt(id: ID!): Malt
  getMalt(id: ID!): Malt
  listMalts(
    filter: TableMaltFilterInput
    limit: Int
    nextToken: String
  ): MaltConnection
  getGristTest(id: ID!): GristTest
  listGristTests(
    maltId: ID!
    filter: TableGristTestFilterInput
    limit: Int
    nextToken: String
  ): GristTestConnection
}

type Subscription {
  onCreateMalt(
    id: ID
    name: String
    topRoller: Float
    bottomRoller: Float
  ): Malt @aws_subscribe(mutations: ["createMalt"])
  onUpdateMalt(
    id: ID
    name: String
    topRoller: Float
    bottomRoller: Float
  ): Malt @aws_subscribe(mutations: ["updateMalt"])
  onDeleteMalt(
    id: ID
    name: String
    topRoller: Float
    bottomRoller: Float
  ): Malt @aws_subscribe(mutations: ["deleteMalt"])
  onCreateGristTest(
    id: ID
    maltId: ID
    createdAt: AWSDateTime
    beer: String
    topRoller: Float
  ): GristTest @aws_subscribe(mutations: ["createGristTest"])
  onUpdateGristTest(
    id: ID
    maltId: ID
    createdAt: AWSDateTime
    beer: String
    topRoller: Float
  ): GristTest @aws_subscribe(mutations: ["updateGristTest"])
  onDeleteGristTest(
    id: ID
    maltId: ID
    createdAt: AWSDateTime
    beer: String
    topRoller: Float
  ): GristTest @aws_subscribe(mutations: ["deleteGristTest"])
}

input TableBooleanFilterInput {
  ne: Boolean
  eq: Boolean
}

input TableFloatFilterInput {
  ne: Float
  eq: Float
  le: Float
  lt: Float
  ge: Float
  gt: Float
  contains: Float
  notContains: Float
  between: [Float]
}

input TableGristTestFilterInput {
  id: TableIDFilterInput
  maltId: TableIDFilterInput
  createdAt: TableStringFilterInput
  beer: TableStringFilterInput
  topRoller: TableFloatFilterInput
  bottomRoller: TableFloatFilterInput
  totalWeight: TableIntFilterInput
  topSeiveWeight: TableIntFilterInput
  thirtyWeight: TableIntFilterInput
  sixtyWeight: TableIntFilterInput
  panWeight: TableIntFilterInput
}

input TableIDFilterInput {
  ne: ID
  eq: ID
  le: ID
  lt: ID
  ge: ID
  gt: ID
  contains: ID
  notContains: ID
  between: [ID]
  beginsWith: ID
}

input TableIntFilterInput {
  ne: Int
  eq: Int
  le: Int
  lt: Int
  ge: Int
  gt: Int
  contains: Int
  notContains: Int
  between: [Int]
}

input TableMaltFilterInput {
  id: TableIDFilterInput
  name: TableStringFilterInput
  topRoller: TableFloatFilterInput
  bottomRoller: TableFloatFilterInput
}

input TableStringFilterInput {
  ne: String
  eq: String
  le: String
  lt: String
  ge: String
  gt: String
  contains: String
  notContains: String
  between: [String]
  beginsWith: String
}

input UpdateGristTestInput {
  id: ID!
  maltId: ID
  createdAt: AWSDateTime
  beer: String
  topRoller: Float
  bottomRoller: Float
  totalWeight: Int
  topSeiveWeight: Int
  thirtyWeight: Int
  sixtyWeight: Int
  panWeight: Int
}

input UpdateMaltInput {
  id: ID!
  name: String
  topRoller: Float
  bottomRoller: Float
}
```

10. Push changes to the cloud

```
amplify push
```

11. Run the project

```
yarn start
```
