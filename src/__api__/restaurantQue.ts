/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantQue
// ====================================================

export interface restaurantQue_restaurant_restaurant_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface restaurantQue_restaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
}

export interface restaurantQue_restaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  photo: string | null;
  price: number;
  options: restaurantQue_restaurant_restaurant_menu_options[] | null;
  description: string;
}

export interface restaurantQue_restaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: restaurantQue_restaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: restaurantQue_restaurant_restaurant_menu[];
}

export interface restaurantQue_restaurant {
  __typename: "RestaurantOutput";
  ok: boolean;
  restaurant: restaurantQue_restaurant_restaurant | null;
  error: string | null;
}

export interface restaurantQue {
  restaurant: restaurantQue_restaurant;
}

export interface restaurantQueVariables {
  input: RestaurantInput;
}
