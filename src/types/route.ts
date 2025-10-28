import type { ComponentType } from 'react';
import { routePaths } from '../constants/paths';

type RouteKeys = keyof typeof routePaths;
type RouteValues = (typeof routePaths)[RouteKeys];

export type TRoute = {
  name?: string;
  path: RouteValues;
  component: ComponentType<any>;
  exact?: boolean;
};
