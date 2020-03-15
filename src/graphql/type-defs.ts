export const typeDefs = `
scalar AWSDateTime

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
	listMalts(filter: TableMaltFilterInput, limit: Int, nextToken: String): MaltConnection
	getGristTest(id: ID!): GristTest
	listGristTests(
		maltId: ID!,
		filter: TableGristTestFilterInput,
		limit: Int,
		nextToken: String
	): GristTestConnection
}

type Subscription {
	onCreateMalt(
		id: ID,
		name: String,
		topRoller: Float,
		bottomRoller: Float
	): Malt
	onUpdateMalt(
		id: ID,
		name: String,
		topRoller: Float,
		bottomRoller: Float
	): Malt
	onDeleteMalt(
		id: ID,
		name: String,
		topRoller: Float,
		bottomRoller: Float
	): Malt
	onCreateGristTest(
		id: ID,
		maltId: ID,
		createdAt: AWSDateTime,
		beer: String,
		topRoller: Float
	): GristTest
	onUpdateGristTest(
		id: ID,
		maltId: ID,
		createdAt: AWSDateTime,
		beer: String,
		topRoller: Float
	): GristTest
	onDeleteGristTest(
		id: ID,
		maltId: ID,
		createdAt: AWSDateTime,
		beer: String,
		topRoller: Float
	): GristTest
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
`;
