/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createRestaurantMu
// ====================================================

export interface createRestaurantMu_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurantId: number | null;
}

export interface createRestaurantMu {
  createRestaurant: createRestaurantMu_createRestaurant;
}

export interface createRestaurantMuVariables {
  input: CreateRestaurantInput;
}
