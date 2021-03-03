/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editOrderMu
// ====================================================

export interface editOrderMu_editOrder {
  __typename: "EditOrderOutput";
  ok: boolean;
  error: string | null;
}

export interface editOrderMu {
  editOrder: editOrderMu_editOrder;
}

export interface editOrderMuVariables {
  input: EditOrderInput;
}
