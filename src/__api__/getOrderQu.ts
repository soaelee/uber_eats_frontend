/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrderQu
// ====================================================

export interface getOrderQu_getOrder_order_customer {
  __typename: "User";
  email: string;
}

export interface getOrderQu_getOrder_order_driver {
  __typename: "User";
  email: string;
}

export interface getOrderQu_getOrder_order_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface getOrderQu_getOrder_order {
  __typename: "Order";
  id: number;
  createdAt: any;
  updateAt: any;
  customer: getOrderQu_getOrder_order_customer | null;
  driver: getOrderQu_getOrder_order_driver | null;
  restaurant: getOrderQu_getOrder_order_restaurant | null;
  total: number | null;
  status: OrderStatus;
}

export interface getOrderQu_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: string | null;
  order: getOrderQu_getOrder_order | null;
}

export interface getOrderQu {
  getOrder: getOrderQu_getOrder;
}

export interface getOrderQuVariables {
  input: GetOrderInput;
}
