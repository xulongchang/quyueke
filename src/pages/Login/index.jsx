import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { Button, Space, Tabs, message, theme } from 'antd';
import { useRef, useState } from 'react';
import "./index.less"
import { service } from '../../utils/service';


export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState('account');
  const formRef = useRef();

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    service({
      url: "/api/login",
      params: formRef.current.getFieldsValue()
    })
    .then(
      (response)=>{
        if (response.code === 200) {
          message.success("登录成功");
          // 存储 token
          localStorage.setItem('token', response.data.token);//todo 后端是否要提供token
          // 跳转到首页
          window.location.href = '/';
        } else {
          message.error(response.message);
        }
      },
      (response)=>{
        message.error(response?.data?.message);
      }
    ).finally(()=>{
      setLoading(false);
    });
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        className='wrap-login h-full flex items-center justify-center z-0'
      >
        <div className='bg-fff rounded-lg overflow-hidden login-wrap flex'>
          <div>
            <img
              src='./images/01.png'
            />
          </div>
          <div>
            <LoginForm
              logo=""
              title="去约课"
              subTitle="更好用的约课平台"
              onFinish={(values)=>{
                // handleSubmit(values)
              }}
              formRef={formRef}
              loading={loading}
              submitter={{
                // 自定义提交按钮
                render: (_, dom) => (
                  <Button
                    type="primary" 
                    loading={loading} // 绑定 loading 状态
                    onClick={() => {
                      handleSubmit()
                    }}
                    className=" w-full"
                  >
                    登录
                  </Button>
                ),
              }}
            >
              <Tabs
                centered
                activeKey={loginType}
                onChange={(activeKey) => setLoginType(activeKey)}
              >
                <Tabs.TabPane key={'account'} tab={'账号登录'} />
                {/* <Tabs.TabPane key={'phone'} tab={'手机号登录'} /> */}
              </Tabs>
              {loginType === 'account' && (
                <>
                  <ProFormText
                    name="username"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'输入注册的手机号'}
                    rules={[
                      {
                        required: true,
                        message: '请输入手机号!',
                      },
                    ]}
                  />
                  <ProFormText.Password
                    name="password"
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={'prefixIcon'} />,
                      strengthText:
                        '密码应包含数字、字母，且长度至少为8个字符。',
                      statusRender: (value) => {
                        const getStatus = () => {
                          if (value && value.length > 8) {
                            return 'ok';
                          }
                          if (value && value.length > 6) {
                            return 'pass';
                          }
                          return 'poor';
                        };
                        const status = getStatus();
                        if (status === 'pass') {
                          return (
                            <div style={{ color: token.colorWarning }}>
                              强度：中
                            </div>
                          );
                        }
                        if (status === 'ok') {
                          return (
                            <div style={{ color: token.colorSuccess }}>
                              强度：强
                            </div>
                          );
                        }
                        return (
                          <div style={{ color: token.colorError }}>强度：弱</div>
                        );
                      },
                    }}
                    placeholder={'请输入密码'}
                    rules={[
                      {
                        required: true,
                        message: '请输入密码！',
                      },
                    ]}
                  />
                </>
              )}
              {loginType === 'phone' && (
                <>
                  其他登录
                </>
              )}
              <div
                className='mb-2 text-right'
              >
                {/* <ProFormCheckbox noStyle name="autoLogin">
                  自动登录
                </ProFormCheckbox> */}
                <a>
                  忘记密码
                </a>
              </div>
            </LoginForm>
          </div>
        </div>
      </div>
      <div className='fixed w-full text-center left-0 bottom-0 pb-3 text-xs'>
        <div>去约课 · 更好用的约课管理平台</div>
        <div className='text-gray-des'>Copyright © 2016-2024 湛江双挺科技有限公司</div>
      </div>
    </ProConfigProvider>
  );
};