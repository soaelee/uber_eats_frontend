/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderUpdatesInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: orderUpdates
// ====================================================

export interface orderUpdates_orderUpdates_customer {
  __typename: "User";
  email: string;
}

export interface orderUpdates_orderUpdates_driver {
  __typename: "User";
  email: string;
}

export interface orderUpdates_orderUpdates_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface orderUpdates_orderUpdates {
  __typename: "Order";
  id: number;
  createdAt: any;
  updateAt: any;
  customer: orderUpdates_orderUpdates_customer | null;
  driver: orderUpdates_orderUpdates_driver | null;
  restaurant: orderUpdates_orderUpdates_restaurant | null;
  total: number | null;
  status: OrderStatus;
}

export interface orderUpdates {
  orderUpdates: orderUpdates_orderUpdates;
}

export interface orderUpdatesVariables {
  input: OrderUpdatesInput;
}
