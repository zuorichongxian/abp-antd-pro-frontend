/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  // user
  {
    path: '/accounts',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/accounts', redirect: '/Account/Login/login' },
      { path: '/accounts/login', component: './Account/Login/Login' },
      { path: '/accounts/register', component: './Account/Register/Register' },
      { path: '/accounts/register-result', component: './Account/RegisterResult/RegisterResult' },
    ],
  },
  {
    path: '/user',
    // component: '../layouts/UserLayout',
    layout: false,
    routes: [
      //   { path: '/user', redirect: '/Account/Login/login' },
      { path: '/user/login', component: './Account/Login/Login.tsx' },

      { path: '/user/register', component: './Account/Register/Register' },
      { path: '/user/register-result', component: './Account/RegisterResult/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/analysis' },
      {
        path: '/analysis',
        name: 'analysis',
        icon: 'precise-shouye',
        component: './Dashboard/Analysis',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'precise-gongzuotai',
        routes: [
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            icon: 'precise-zhuzhuangtu',
            component: './Dashboard/Workplace',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            icon: 'precise-jiankong',
            component: './Dashboard/Monitor',
          },
        ],
      },
      // arcgis
      {
        path: '/arcgis',
        icon: 'precise-17',
        name: 'arcgis',
        routes: [
          {
            path: '/arcgis/arcgismap',
            name: 'arcgismap',
            icon: 'precise-changyongshili',
            component: './ArcgisMap',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/admin',
        name: 'admin',
        authority: ['Pages.Administration'],
        icon: 'precise-xitongguanli',
        routes: [
          {
            path: '/admin/organization',
            name: 'organization',
            authority: ['Pages.Administration.OrganizationUnits'],
            icon: 'cluster',
            component: './Admin/OrganizationUnit',
          },
          {
            path: '/admin/role',
            name: 'role',
            authority: ['Pages.Administration.Roles'],
            icon: 'idcard',
            component: './Admin/Role',
          },
          {
            path: '/admin/user',
            name: 'user',
            authority: ['Pages.Administration.Users'],
            icon: 'user',
            component: './Precise/Users',
          },
          {
            path: '/admin/workflow',
            name: 'workflow',
            icon: 'precise-navicon-lcpz',
            component: './Admin/WorkFlow/EditWork',
          },
          {
            path: '/admin/auditLog',
            name: 'auditLog',
            authority: ['Pages.Administration.AuditLogs'],
            icon: 'precise-rizhi',
            component: './Admin/AuditLog',
          },
          {
            path: '/admin/ui',
            name: 'ui',
            authority: ['Pages.Administration.UiCustomization'],
            icon: 'precise-yanjing',
            component: './Admin/UiCustomization',
          },
          {
            path: '/admin/settings',
            name: 'settings',
            authority: [
              'Pages.Administration.Tenant.Settings',
              'Pages.Administration.Host.Settings',
            ],
            icon: 'precise-shezhi',
            component: './Admin/Settings',
          },
        ],
      },
      {
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
