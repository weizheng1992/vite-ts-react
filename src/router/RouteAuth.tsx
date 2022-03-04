import React from 'react';
import { RouteProps } from 'react-router';
import PrivateRoute from './PrivateRoute';
import { useTitle } from 'react-use';

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  title: string;
  /** authorization？ */
  auth?: boolean;
  element: React.ReactElement;
}

const WrapperRouteComponent: React.FC<WrapperRouteProps> = ({
  title,
  auth,
  element,
}: WrapperRouteProps) => {
  useTitle(title);
  if (auth) {
    return <PrivateRoute>{element}</PrivateRoute>;
  }
  return element;
};

export default WrapperRouteComponent;
