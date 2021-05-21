import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import PrivateRoute from './PrivateRoute';

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  title: string;
  /** authorization？ */
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
  title,
  auth,
  ...props
}: WrapperRouteProps) => {
  const WitchRoute = auth ? PrivateRoute : Route;
  if (title) {
    document.title = title;
  }
  return <WitchRoute {...props} />;
};

export default WrapperRouteComponent;
