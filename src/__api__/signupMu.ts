/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAccountInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: signupMu
// ====================================================

export interface signupMu_createAccount {
  __typename: "CreateAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface signupMu {
  createAccount: signupMu_createAccount;
}

export interface signupMuVariables {
  input: CreateAccountInput;
}
