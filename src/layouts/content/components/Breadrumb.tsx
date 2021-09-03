import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { staticMenus } from '/@/router/menu/';
import { MenuItem } from '/@/router/menu/type';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';

import { getAllParentPath } from '/@/utils/helper/menuHelper';
const Bread: React.FC = () => {
  const location = useLocation();
  const [routes, setroutes] = useState<Route[]>([]);
  useEffect(() => {
    // if (currentRoute.value.name === REDIRECT_NAME) return;
    // const menus = await getMenus();

    const parent = getAllParentPath(staticMenus, location.pathname);
    const filterMenus = staticMenus.filter((item) => item.path === parent[0]);
    const matched = getMatched(filterMenus, parent) as any;
    if (!matched || matched.length === 0) return;
    setroutes(matched);
  }, [location.pathname]);

  function getMatched(menus: MenuItem[], parent: string[]) {
    const metched: MenuItem[] = [];
    menus.forEach((item) => {
      if (parent.includes(item.path)) {
        metched.push({
          path: item.path,
          name: item.name,
          breadcrumbName: item.breadcrumbName,
        });
      }
      if (item.children?.length) {
        metched.push(...getMatched(item.children, parent));
      }
    });
    return metched;
  }
  return (
    <Breadcrumb style={{ margin: '16px 0' }} itemRender={itemRender} routes={routes}></Breadcrumb>
  );
};

function itemRender(route, _, routes) {
  const last = routes.indexOf(route) === routes.length - 1;

  return last ? <span>{route.name}</span> : <span>{route.name}</span>;
}
export default Bread;
