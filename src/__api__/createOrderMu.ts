/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOrderMu
// ====================================================

export interface createOrderMu_createOrder {
  __typename: "CreateOrderOutput";
  ok: boolean;
  error: string | null;
  orderId: number | null;
}

export interface createOrderMu {
  createOrder: createOrderMu_createOrder;
}

export interface createOrderMuVariables {
  input: CreateOrderInput;
}
