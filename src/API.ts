/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMaltInput = {
  name: string,
  topRoller?: number | null,
  bottomRoller?: number | null,
};

export type UpdateMaltInput = {
  id: string,
  name?: string | null,
  topRoller?: number | null,
  bottomRoller?: number | null,
};

export type DeleteMaltInput = {
  id: string,
};

export type CreateGristTestInput = {
  maltId: string,
  createdAt?: string | null,
  beer: string,
  topRoller: number,
  bottomRoller: number,
  totalWeight: number,
  topSeiveWeight: number,
  thirtyWeight: number,
  sixtyWeight: number,
  panWeight: number,
};

export type UpdateGristTestInput = {
  id: string,
  maltId?: string | null,
  createdAt?: string | null,
  beer?: string | null,
  topRoller?: number | null,
  bottomRoller?: number | null,
  totalWeight?: number | null,
  topSeiveWeight?: number | null,
  thirtyWeight?: number | null,
  sixtyWeight?: number | null,
  panWeight?: number | null,
};

export type DeleteGristTestInput = {
  id: string,
};

export type TableMaltFilterInput = {
  id?: TableIDFilterInput | null,
  name?: TableStringFilterInput | null,
  topRoller?: TableFloatFilterInput | null,
  bottomRoller?: TableFloatFilterInput | null,
};

export type TableIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type TableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type TableFloatFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type TableGristTestFilterInput = {
  id?: TableIDFilterInput | null,
  maltId?: TableIDFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  beer?: TableStringFilterInput | null,
  topRoller?: TableFloatFilterInput | null,
  bottomRoller?: TableFloatFilterInput | null,
  totalWeight?: TableIntFilterInput | null,
  topSeiveWeight?: TableIntFilterInput | null,
  thirtyWeight?: TableIntFilterInput | null,
  sixtyWeight?: TableIntFilterInput | null,
  panWeight?: TableIntFilterInput | null,
};

export type TableIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type CreateMaltMutationVariables = {
  input: CreateMaltInput,
};

export type CreateMaltMutation = {
  createMalt:  {
    __typename: "Malt",
    id: string,
    name: string,
    topRoller: number | null,
    bottomRoller: number | null,
    gristTests:  Array< {
      __typename: "GristTest",
      id: string,
      maltId: string,
      createdAt: string | null,
      beer: string,
      topRoller: number,
      bottomRoller: number,
      totalWeight: number,
      topSeiveWeight: number,
      thirtyWeight: number,
      sixtyWeight: number,
      panWeight: number,
    } | null > | null,
  } | null,
};

export type UpdateMaltMutationVariables = {
  input: UpdateMaltInput,
};

export type UpdateMaltMutation = {
  updateMalt:  {
    __typename: "Malt",
    id: string,
    name: string,
    topRoller: number | null,
    bottomRoller: number | null,
    gristTests:  Array< {
      __typename: "GristTest",
      id: string,
      maltId: string,
      createdAt: string | null,
      beer: string,
      topRoller: number,
      bottomRoller: number,
      totalWeight: number,
      topSeiveWeight: number,
      thirtyWeight: number,
      sixtyWeight: number,
      panWeight: number,
    } | null > | null,
  } | null,
};

export type DeleteMaltMutationVariables = {
  input: DeleteMaltInput,
};

export type DeleteMaltMutation = {
  deleteMalt:  {
    __typename: "Malt",
    id: string,
    name: string,
    topRoller: number | null,
    bottomRoller: number | null,
    gristTests:  Array< {
      __typename: "GristTest",
      id: string,
      maltId: string,
      createdAt: string | null,
      beer: string,
      topRoller: number,
      bottomRoller: number,
      totalWeight: number,
      topSeiveWeight: number,
      thirtyWeight: number,
      sixtyWeight: number,
      panWeight: number,
    } | null > | null,
  } | null,
};

export type CreateGristTestMutationVariables = {
  input: CreateGristTestInput,
};

export type CreateGristTestMutation = {
  createGristTest:  {
    __typename: "GristTest",
    id: string,
    maltId: string,
    createdAt: string | null,
    beer: string,
    topRoller: number,
    bottomRoller: number,
    totalWeight: number,
    topSeiveWeight: number,
    thirtyWeight: number,
    sixtyWeight: number,
    panWeight: number,
  } | null,
};

export type UpdateGristTestMutationVariables = {
  input: UpdateGristTestInput,
};

export type UpdateGristTestMutation = {
  updateGristTest:  {
    __typename: "GristTest",
    id: string,
    maltId: string,
    createdAt: string | null,
    beer: string,
    topRoller: number,
    bottomRoller: number,
    totalWeight: number,
    topSeiveWeight: number,
    thirtyWeight: number,
    sixtyWeight: number,
    panWeight: number,
  } | null,
};

export type DeleteGristTestMutationVariables = {
  input: DeleteGristTestInput,
};

export type DeleteGristTestMutation = {
  deleteGristTest:  {
    __typename: "GristTest",
    id: string,
    maltId: string,
    createdAt: string | null,
    beer: string,
    topRoller: number,
    bottomRoller: number,
    totalWeight: number,
    topSeiveWeight: number,
    thirtyWeight: number,
    sixtyWeight: number,
    panWeight: number,
  } | null,
};

export type FetchGristTestQueryVariables = {
  id: string,
};

export type FetchGristTestQuery = {
  fetchGristTest:  {
    __typename: "GristTest",
    id: string,
    maltId: string,
    createdAt: string | null,
    beer: string,
    topRoller: number,
    bottomRoller: number,
    totalWeight: number,
    topSeiveWeight: number,
    thirtyWeight: number,
    sixtyWeight: number,
    panWeight: number,
  } | null,
};

export type FetchMaltQueryVariables = {
  id: string,
};

export type FetchMaltQuery = {
  fetchMalt:  {
    __typename: "Malt",
    id: string,
    name: string,
    topRoller: number | null,
    bottomRoller: number | null,
    gristTests:  Array< {
      __typename: "GristTest",
      id: string,
      maltId: string,
      createdAt: string | null,
      beer: string,
      topRoller: number,
      bottomRoller: number,
      totalWeight: number,
      topSeiveWeight: number,
      thirtyWeight: number,
      sixtyWeight: number,
      panWeight: number,
    } | null > | null,
  } | null,
};

export type GetMaltQueryVariables = {
  id: string,
};

export type GetMaltQuery = {
  getMalt:  {
    __typename: "Malt",
    id: string,
    name: string,
    topRoller: number | null,
    bottomRoller: number | null,
    gristTests:  Array< {
      __typename: "GristTest",
      id: string,
      maltId: string,
      createdAt: string | null,
      beer: string,
      topRoller: number,
      bottomRoller: number,
      totalWeight: number,
      topSeiveWeight: number,
      thirtyWeight: number,
      sixtyWeight: number,
      panWeight: number,
    } | null > | null,
  } | null,
};

export type ListMaltsQueryVariables = {
  filter?: TableMaltFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMaltsQuery = {
  listMalts:  {
    __typename: "MaltConnection",
    items:  Array< {
      __typename: "Malt",
      id: string,
      name: string,
      topRoller: number | null,
      bottomRoller: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGristTestQueryVariables = {
  id: string,
};

export type GetGristTestQuery = {
  getGristTest:  {
    __typename: "GristTest",
    id: string,
    maltId: string,
    createdAt: string | null,
    beer: string,
    topRoller: number,
    bottomRoller: number,
    totalWeight: number,
    topSeiveWeight: number,
    thirtyWeight: number,
    sixtyWeight: number,
    panWeight: number,
  } | null,
};

export type ListGristTestsQueryVariables = {
  maltId: string,
  filter?: TableGristTestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGristTestsQuery = {
  listGristTests:  {
    __typename: "GristTestConnection",
    items:  Array< {
      __typename: "GristTest",
      id: string,
      maltId: string,
      createdAt: string | null,
      beer: string,
      topRoller: number,
      bottomRoller: number,
      totalWeight: number,
      topSeiveWeight: number,
      thirtyWeight: number,
      sixtyWeight: number,
      panWeight: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateMaltSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  topRoller?: number | null,
  bottomRoller?: number | null,
};

export type OnCreateMaltSubscription = {
  onCreateMalt:  {
    __typename: "Malt",
    id: string,
    name: string,
    topRoller: number | null,
    bottomRoller: number | null,
    gristTests:  Array< {
      __typename: "GristTest",
      id: string,
      maltId: string,
      createdAt: string | null,
      beer: string,
      topRoller: number,
      bottomRoller: number,
      totalWeight: number,
      topSeiveWeight: number,
      thirtyWeight: number,
      sixtyWeight: number,
      panWeight: number,
    } | null > | null,
  } | null,
};

export type OnUpdateMaltSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  topRoller?: number | null,
  bottomRoller?: number | null,
};

export type OnUpdateMaltSubscription = {
  onUpdateMalt:  {
    __typename: "Malt",
    id: string,
    name: string,
    topRoller: number | null,
    bottomRoller: number | null,
    gristTests:  Array< {
      __typename: "GristTest",
      id: string,
      maltId: string,
      createdAt: string | null,
      beer: string,
      topRoller: number,
      bottomRoller: number,
      totalWeight: number,
      topSeiveWeight: number,
      thirtyWeight: number,
      sixtyWeight: number,
      panWeight: number,
    } | null > | null,
  } | null,
};

export type OnDeleteMaltSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  topRoller?: number | null,
  bottomRoller?: number | null,
};

export type OnDeleteMaltSubscription = {
  onDeleteMalt:  {
    __typename: "Malt",
    id: string,
    name: string,
    topRoller: number | null,
    bottomRoller: number | null,
    gristTests:  Array< {
      __typename: "GristTest",
      id: string,
      maltId: string,
      createdAt: string | null,
      beer: string,
      topRoller: number,
      bottomRoller: number,
      totalWeight: number,
      topSeiveWeight: number,
      thirtyWeight: number,
      sixtyWeight: number,
      panWeight: number,
    } | null > | null,
  } | null,
};

export type OnCreateGristTestSubscriptionVariables = {
  id?: string | null,
  maltId?: string | null,
  createdAt?: string | null,
  beer?: string | null,
  topRoller?: number | null,
};

export type OnCreateGristTestSubscription = {
  onCreateGristTest:  {
    __typename: "GristTest",
    id: string,
    maltId: string,
    createdAt: string | null,
    beer: string,
    topRoller: number,
    bottomRoller: number,
    totalWeight: number,
    topSeiveWeight: number,
    thirtyWeight: number,
    sixtyWeight: number,
    panWeight: number,
  } | null,
};

export type OnUpdateGristTestSubscriptionVariables = {
  id?: string | null,
  maltId?: string | null,
  createdAt?: string | null,
  beer?: string | null,
  topRoller?: number | null,
};

export type OnUpdateGristTestSubscription = {
  onUpdateGristTest:  {
    __typename: "GristTest",
    id: string,
    maltId: string,
    createdAt: string | null,
    beer: string,
    topRoller: number,
    bottomRoller: number,
    totalWeight: number,
    topSeiveWeight: number,
    thirtyWeight: number,
    sixtyWeight: number,
    panWeight: number,
  } | null,
};

export type OnDeleteGristTestSubscriptionVariables = {
  id?: string | null,
  maltId?: string | null,
  createdAt?: string | null,
  beer?: string | null,
  topRoller?: number | null,
};

export type OnDeleteGristTestSubscription = {
  onDeleteGristTest:  {
    __typename: "GristTest",
    id: string,
    maltId: string,
    createdAt: string | null,
    beer: string,
    topRoller: number,
    bottomRoller: number,
    totalWeight: number,
    topSeiveWeight: number,
    thirtyWeight: number,
    sixtyWeight: number,
    panWeight: number,
  } | null,
};
