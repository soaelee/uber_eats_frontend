/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: pendingOrders
// ====================================================

export interface pendingOrders_pendingOrders_customer {
  __typename: "User";
  email: string;
}

export interface pendingOrders_pendingOrders_driver {
  __typename: "User";
  email: string;
}

export interface pendingOrders_pendingOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface pendingOrders_pendingOrders {
  __typename: "Order";
  id: number;
  createdAt: any;
  updateAt: any;
  customer: pendingOrders_pendingOrders_customer | null;
  driver: pendingOrders_pendingOrders_driver | null;
  restaurant: pendingOrders_pendingOrders_restaurant | null;
  total: number | null;
  status: OrderStatus;
}

export interface pendingOrders {
  pendingOrders: pendingOrders_pendingOrders;
}
