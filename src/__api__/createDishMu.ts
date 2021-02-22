/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createDishMu
// ====================================================

export interface createDishMu_createDish {
  __typename: "CreateDishOutput";
  ok: boolean;
  error: string | null;
}

export interface createDishMu {
  createDish: createDishMu_createDish;
}

export interface createDishMuVariables {
  input: CreateDishInput;
}
