/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurantQue
// ====================================================

export interface searchRestaurantQue_searchRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantQue_searchRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: searchRestaurantQue_searchRestaurant_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurantQue_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: searchRestaurantQue_searchRestaurant_restaurants[] | null;
}

export interface searchRestaurantQue {
  searchRestaurant: searchRestaurantQue_searchRestaurant;
}

export interface searchRestaurantQueVariables {
  input: SearchRestaurantInput;
}
