// 运行时配置

import { ProBreadcrumb } from "@ant-design/pro-components";
import { Breadcrumb } from "antd";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    // menuHeaderRender: ()=>{
    //   return <>menuHeaderRender</>
    // },//左上角logo区域
    // menuFooterRender: ()=>{
    //   return <>menuFooterRender</>
    // },
    // menuExtraRender: ()=>{
    //   return <>menuExtraRender</>
    // },
    // headerRender: ()=>{
    //   return <>headerRender</>
    // },
    // appListRender: ()=>{
    //   return <>appListRender</>
    // },
    // headerRender: ()=>{
    //   return <>headerRender</>
    // },
    // pageTitleRender: ()=>{
    //   return <>pageTitleRender</>
    // },
    // breadcrumbRender: ({children ,...props})=>{
    //   debugger;
    //   return <div>
    //     <Breadcrumb />
    //     <div>312321123</div>
    //   </div>
    // },
    // fixSiderbar: true,
    // layout: 'side',
    // splitMenus: true,
    // fixedHeader: true,
    // avatarProps: {
    //   src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    //   size: 'small',
    //   title: '七妮妮',
    // }
    // breadcrumbRender: (route)=>{
    //   debugger;
    //   return route
    // }
    breadcrumbRender:(routers = []) => [
      {
        path: '/',
        breadcrumbName: '自定义首页',
      },
      ...routers,
    ],
    // 自定义分隔符
    breadcrumbProps:{
      separator: '>',
      itemRender: (route, params, items) => (
        <span>
           {route.breadcrumbName}
        </span>
      )
    }
  };
};
