import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
// import "./index.css"
import "./index.css"
// import { useLocation, useRouteMatch } from 'umi';

export default ({children}) => {
  const { name } = useModel('global');
  // const location = useLocation();
  // const matchRoutes = useRouteMatch();
  return (
    <PageContainer
      header={{
        title: null,       // 隐藏标题
        breadcrumb: null,  // 隐藏面包屑
      }}
      className='my-ant-pro-page-container'
    >
      <div
        className='flex h-full flex-col'
      >

        <div
          className='flex justify-between h-16 bg-fff px-5 items-center'
        >
          <div>
            <ProBreadcrumb />
          </div>
          <div>
            退出
          </div>
        </div>

        <div
          className='grow h-1'
        >
          {children}
        </div>
      </div>
    </PageContainer>
  );
};