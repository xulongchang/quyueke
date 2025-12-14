import { defineConfig } from "@umijs/max";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "去约课",
  },
  routes: [
    {
      name: "登录",
      path: "/login",
      component: "./Login",
      layout: false,
    },
    {
      path: "/",
      redirect: "/teacher",
    },
    {
      name: "老师管理",
      path: "/teacher",
      component: "./Teacher",
    },
    {
      name: "权限演示",
      path: "/access",
      component: "./Access",
    },
    {
      name: " CRUD 示例",
      path: "/table",
      component: "./Table",
    },
  ],

  npmClient: "yarn",
  tailwindcss: {},
});