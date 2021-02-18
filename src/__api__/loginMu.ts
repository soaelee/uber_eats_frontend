/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: loginMu
// ====================================================

export interface loginMu_login {
  __typename: "LoginOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface loginMu {
  login: loginMu_login;
}

export interface loginMuVariables {
  input: LoginInput;
}
