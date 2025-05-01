/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateFarmInput = {
  building?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ownerId: Scalars['Int']['input'];
  postalCode: Scalars['String']['input'];
  prefecture: Scalars['String']['input'];
  restAddress: Scalars['String']['input'];
};

export type CreateOrderInput = {
  farmId: Scalars['Int']['input'];
  produceItems: Array<ProduceItemOrderInput>;
};

export type CreateProduceItemInput = {
  farmId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateShipmentInput = {
  orderId: Scalars['Int']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type Farm = {
  __typename?: 'Farm';
  building?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  orders: Array<Order>;
  owner: User;
  postalCode: Scalars['String']['output'];
  prefecture: Scalars['String']['output'];
  produceItems: Array<ProduceItem>;
  produceStocks: Array<ProduceStock>;
  restAddress: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFarm: Farm;
  createOrder: Order;
  createProduceItem: ProduceItem;
  createShipment: Shipment;
  createUser: User;
  updateProduceStock: ProduceStock;
  updateShipment: Shipment;
};


export type MutationCreateFarmArgs = {
  createFarmInput: CreateFarmInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreateProduceItemArgs = {
  createProduceItemInput: CreateProduceItemInput;
};


export type MutationCreateShipmentArgs = {
  createShipmentInput: CreateShipmentInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUpdateProduceStockArgs = {
  updateProduceStockInput: UpdateProduceStockInput;
};


export type MutationUpdateShipmentArgs = {
  updateShipmentInput: UpdateShipmentInput;
};

export type Order = {
  __typename?: 'Order';
  buyer: User;
  buyerId: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  farm: Farm;
  farmId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  orderDetails: Array<OrderDetail>;
  orderedAt: Scalars['DateTime']['output'];
  shipment?: Maybe<Shipment>;
  status: OrderStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderDetail = {
  __typename?: 'OrderDetail';
  amount: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  order: Order;
  orderId: Scalars['Int']['output'];
  produceItem: ProduceItem;
  produceItemId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** 注文ステータス */
export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Shipped = 'SHIPPED'
}

export type ProduceItem = {
  __typename?: 'ProduceItem';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  farm: Farm;
  farmId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderDetails: Array<OrderDetail>;
  produceStock: ProduceStock;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProduceItemOrderInput = {
  amount: Scalars['Int']['input'];
  produceItemId: Scalars['Int']['input'];
};

export type ProduceStock = {
  __typename?: 'ProduceStock';
  amount: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  farm: Farm;
  farmId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  produceItem: ProduceItem;
  produceItemId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  farm: Farm;
  farms: Array<Farm>;
  users: Array<User>;
};


export type QueryFarmArgs = {
  id: Scalars['Float']['input'];
};

/** ユーザーの権限 */
export enum Role {
  Admin = 'Admin',
  Buyer = 'Buyer',
  Farmer = 'Farmer'
}

export type Shipment = {
  __typename?: 'Shipment';
  createdAt: Scalars['DateTime']['output'];
  deliveredAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedDeliveryDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  order: Order;
  orderId: Scalars['Int']['output'];
  shippedAt?: Maybe<Scalars['DateTime']['output']>;
  status: ShipmentStatus;
  updatedAt: Scalars['DateTime']['output'];
};

/** 発送ステータス */
export enum ShipmentStatus {
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Shipped = 'SHIPPED'
}

export type UpdateProduceStockInput = {
  amount: Scalars['Int']['input'];
  farmId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};

export type UpdateShipmentInput = {
  id: Scalars['Int']['input'];
  status: ShipmentStatus;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  farms?: Maybe<Array<Farm>>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  orders?: Maybe<Array<Order>>;
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateFarmMutationVariables = Exact<{
  createFarmInput: CreateFarmInput;
}>;


export type CreateFarmMutation = { __typename?: 'Mutation', createFarm: { __typename?: 'Farm', id: string, name: string, postalCode: string, prefecture: string, city: string, restAddress: string, building?: string | null, owner: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string }> };

export type CreateOrderMutationVariables = Exact<{
  createOrderInput: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: number, orderedAt: any, status: OrderStatus, buyer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, farm: { __typename?: 'Farm', id: string, name: string }, orderDetails: Array<{ __typename?: 'OrderDetail', id: number, amount: number, produceItem: { __typename?: 'ProduceItem', id: number, name: string } }> } };

export type GetFarmRelatedItemQueryVariables = Exact<{
  farmId: Scalars['Float']['input'];
}>;


export type GetFarmRelatedItemQuery = { __typename?: 'Query', farm: { __typename?: 'Farm', id: string, name: string, produceItems: Array<{ __typename?: 'ProduceItem', id: number, name: string, produceStock: { __typename?: 'ProduceStock', id: number, amount: number } }> } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };


export const CreateFarmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFarm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createFarmInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFarmInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFarm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createFarmInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createFarmInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"prefecture"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"restAddress"}},{"kind":"Field","name":{"kind":"Name","value":"building"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateFarmMutation, CreateFarmMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrderInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrderInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrderInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"buyer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"farm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"produceItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetFarmRelatedItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFarmRelatedItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"farmId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"farm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"farmId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"produceItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"produceStock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFarmRelatedItemQuery, GetFarmRelatedItemQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;