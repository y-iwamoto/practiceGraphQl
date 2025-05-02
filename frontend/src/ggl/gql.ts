/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateFarm($createFarmInput: CreateFarmInput!) {\n    createFarm(createFarmInput: $createFarmInput) {\n      id\n      name\n      postalCode\n      prefecture\n      city\n      restAddress\n      building\n      owner {\n        id\n        email\n        firstName\n        lastName\n      }\n    }\n  }\n": typeof types.CreateFarmDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": typeof types.GetUsersDocument,
    "\n  mutation CreateOrder($createOrderInput: CreateOrderInput!) {\n    createOrder(createOrderInput: $createOrderInput) {\n      id\n      orderedAt\n      status\n      buyer {\n        id\n        firstName\n        lastName\n        email\n      }\n      farm {\n        id\n        name\n      }\n      orderDetails {\n        id\n        amount\n        produceItem {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.CreateOrderDocument,
    "\n  query GetFarmRelatedItem($farmId: Float!) {\n    farm(id: $farmId) {\n      id\n      name\n      produceItems {\n        id\n        name\n        produceStock {\n          id\n          amount\n        }\n      }\n    }\n  }\n": typeof types.GetFarmRelatedItemDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": typeof types.CreateUserDocument,
};
const documents: Documents = {
    "\n  mutation CreateFarm($createFarmInput: CreateFarmInput!) {\n    createFarm(createFarmInput: $createFarmInput) {\n      id\n      name\n      postalCode\n      prefecture\n      city\n      restAddress\n      building\n      owner {\n        id\n        email\n        firstName\n        lastName\n      }\n    }\n  }\n": types.CreateFarmDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.GetUsersDocument,
    "\n  mutation CreateOrder($createOrderInput: CreateOrderInput!) {\n    createOrder(createOrderInput: $createOrderInput) {\n      id\n      orderedAt\n      status\n      buyer {\n        id\n        firstName\n        lastName\n        email\n      }\n      farm {\n        id\n        name\n      }\n      orderDetails {\n        id\n        amount\n        produceItem {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.CreateOrderDocument,
    "\n  query GetFarmRelatedItem($farmId: Float!) {\n    farm(id: $farmId) {\n      id\n      name\n      produceItems {\n        id\n        name\n        produceStock {\n          id\n          amount\n        }\n      }\n    }\n  }\n": types.GetFarmRelatedItemDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.CreateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFarm($createFarmInput: CreateFarmInput!) {\n    createFarm(createFarmInput: $createFarmInput) {\n      id\n      name\n      postalCode\n      prefecture\n      city\n      restAddress\n      building\n      owner {\n        id\n        email\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFarm($createFarmInput: CreateFarmInput!) {\n    createFarm(createFarmInput: $createFarmInput) {\n      id\n      name\n      postalCode\n      prefecture\n      city\n      restAddress\n      building\n      owner {\n        id\n        email\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    users {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrder($createOrderInput: CreateOrderInput!) {\n    createOrder(createOrderInput: $createOrderInput) {\n      id\n      orderedAt\n      status\n      buyer {\n        id\n        firstName\n        lastName\n        email\n      }\n      farm {\n        id\n        name\n      }\n      orderDetails {\n        id\n        amount\n        produceItem {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrder($createOrderInput: CreateOrderInput!) {\n    createOrder(createOrderInput: $createOrderInput) {\n      id\n      orderedAt\n      status\n      buyer {\n        id\n        firstName\n        lastName\n        email\n      }\n      farm {\n        id\n        name\n      }\n      orderDetails {\n        id\n        amount\n        produceItem {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFarmRelatedItem($farmId: Float!) {\n    farm(id: $farmId) {\n      id\n      name\n      produceItems {\n        id\n        name\n        produceStock {\n          id\n          amount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFarmRelatedItem($farmId: Float!) {\n    farm(id: $farmId) {\n      id\n      name\n      produceItems {\n        id\n        name\n        produceStock {\n          id\n          amount\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;