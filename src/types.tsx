import React from 'react';

export interface FunctionProp {
  [column: string]: Function;
}

export interface UserType {
  name?: string,
  team?: string,
  admin?: string,
  email?: string,
  group?: string
}

export interface UpdateContext {
  user: UserType;
  update: (data: object) => void;
}
export interface MapType {
  [data: string]: Map<any, any>;
}

export interface UAUpdate {
  userAnswers: Map<any, any>;
  updateUA: (data: Map<any, any> ) => void;
}

export interface ScoreUpdate {
  teamScore: {};
  updateScore: (data: {}) => void;
}

