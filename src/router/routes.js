const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/list',
    component: () => import('layouts/listLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/ProductPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginUserLayout.vue'),
    children: [{ path: '', component: () => import('../pages/loginPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
