import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register-admin',
    name: 'pages-register-admin',
    component: () => import('@/views/pages/RegisterAdmin.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/login-admin',
    name: 'pages-login',
    component: () => import('@/views/pages/LoginAdmin.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/login-landing',
    name: 'pages-login-landing',
    component: () => import('@/views/pages/LoginLanding.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/pages/products/Index.vue'),
  },
  {
    path: '/product/create',
    name: 'create-product',
    component: () => import('@/views/pages/products/product/ProductAdd.vue'),
  },
  {
    path: '/product/update/:id',
    name: 'update-product',
    component: () => import('@/views/pages/products/product/ProductUpdate.vue'),
  },
  {
    path: '/product/:id',
    name: 'show-product',
    component: () => import('@/views/pages/products/product/ProductShow.vue'),
    beforeEnter: (to, from, next) => {
      const id = Number.parseInt(to.params.id, 10)
      if (Number.isNaN(id)) return next({ name: 'error-404' })

      return next()
    },
  },

  //
  {
    path: '/suppliers',
    name: 'suppliers',
    component: () => import('@/views/pages/suppliers/Index.vue'),
  },
  {
    path: '/supplier/create',
    name: 'create-supplier',
    component: () => import('@/views/pages/suppliers/supplier/SupplierAdd.vue'),
  },
  {
    path: '/supplier/update/:id',
    name: 'update-supplier',
    component: () => import('@/views/pages/suppliers/supplier/SupplierUpdate.vue'),
  },
  {
    path: '/supplier/:id',
    name: 'show-supplier',
    component: () => import('@/views/pages/suppliers/supplier/SupplierShow.vue'),
    beforeEnter: (to, from, next) => {
      const id = Number.parseInt(to.params.id, 10)
      if (Number.isNaN(id)) return next({ name: 'error-404' })

      return next()
    },
  },
  {
    path: '/purchase-orders',
    name: 'purchase-orders',
    component: () => import('@/views/pages/purchase-orders/Index.vue'),
  },
  {
    path: '/purchase-order/create',
    name: 'create-purchase-order',
    component: () => import('@/views/pages/purchase-orders/purchase-order/PurchaseOrderAdd.vue'),
  },
  {
    path: '/purchase-order/update/:id',
    name: 'update-purchase-order',
    component: () => import('@/views/pages/purchase-orders/purchase-order/PurchaseOrderUpdate.vue'),
  },
  {
    path: '/purchase-order/:id',
    name: 'show-purchase-order',
    component: () => import('@/views/pages/purchase-orders/purchase-order/PurchaseOrderShow.vue'),
  },
  {
    path: '/purchase-order/approve/:id',
    name: 'approve-purchase-order',
    component: () => import('@/views/pages/purchase-orders/purchase-order/PurchaseOrderApprove.vue'),
  },
  {
    path: '/purchase-order/in-transit/:id',
    name: 'in-transit-purchase-order',
    component: () => import('@/views/pages/purchase-orders/purchase-order/PurchaseOrderInTransit.vue'),
  },
  {
    path: '/purchase-order/pier-to-warehouse/:id',
    name: 'pier-to-warehouse-purchase-order',
    component: () => import('@/views/pages/purchase-orders/purchase-order/PurchaseOrderPierToWarehouse.vue'),
  },
  {
    path: '/purchase-order/arrival/:id',
    name: 'arrival-purchase-order',
    component: () => import('@/views/pages/purchase-orders/purchase-order/PurchaseOrderArrival.vue'),
  },

  //
  {
    path: '/sales/clients',
    name: 'sales-clients',
    component: () => import('@/views/pages/sales/clients/Index.vue'),
  },
  {
    path: '/sales/client/create',
    name: 'create-sales-client',
    component: () => import('@/views/pages/sales/client/ClientAdd.vue'),
  },
  {
    path: '/sales/client/update/:id',
    name: 'update-sales-client',
    component: () => import('@/views/pages/sales/client/ClientUpdate.vue'),
  },
  {
    path: '/sales/client/:id',
    name: 'sales-client',
    component: () => import('@/views/pages/sales/client/ClientShow.vue'),
    beforeEnter: (to, from, next) => {
      const id = Number.parseInt(to.params.id, 10)
      if (Number.isNaN(id)) return next({ name: 'error-404' })

      return next()
    },
  },
  {
    path: '/user-access-menu',
    name: 'user-access-menu',
    component: () => import('@/views/pages/user-access-management/UserAccessMenu.vue'),
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/views/pages/user-access-management/roles/Index.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/pages/user-access-management/users/Index.vue'),
  },
  {
    path: '/users/:id',
    name: 'user-page',
    component: () => import('@/views/pages/user-access-management/users/user/AccountSettings.vue'),
  },
  {
    path: '/user-create',
    name: 'user-create',
    component: () => import('@/views/pages/user-access-management/users/user/UserCreation.vue'),
  },
  {
    path: '/abilities',
    name: 'abilities',
    component: () => import('@/views/pages/user-access-management/abilities/Index.vue'),
  },
  {
    path: '/access-levels',
    name: 'access-levels',
    component: () => import('@/views/pages/user-access-management/access-levels/Index.vue'),
  },
  {
    path: '/departments',
    name: 'departments',
    component: () => import('@/views/pages/user-access-management/departments/Index.vue'),
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: () => import('@/views/pages/master-files/accounts/IndexPage.vue'),
  },
  {
    path: '/documents',
    name: 'documents',
    component: () => import('@/views/pages/master-files/documents/IndexPage.vue'),
  },
  {
    path: '/locations',
    name: 'locations',
    component: () => import('@/views/pages/master-files/locations/IndexPage.vue'),
  },
  {
    path: '/salesman',
    name: 'salesman',
    component: () => import('@/views/pages/master-files/salesman/IndexPage.vue'),
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/raw-materials-release',
    name: 'release-page',
    component: () => import('@/views/pages/warehouse/raw-materials-release/Index.vue'),
  },
  {
    path: '/warehouse-page',
    name: 'warehouse page',
    component: () => import('@/views/pages/warehouse/IndexPage.vue'),
  },
  {
    path: '/warehouses',
    name: 'warehouse-branch',
    component: () => import('@/views/pages/warehouse/branches-page/Index.vue'),
  },
  {
    path: '/warehouses/create',
    name: 'create-warehouse',
    component: () => import('@/views/pages/warehouse/branches-page/CreateWarehouse.vue'),
  },
  {
    path: '/warehouses/edit/:id',
    name: 'update-warehouse',
    component: () => import('@/views/pages/warehouse/branches-page/EditWarehouse.vue'),
  },

  {
    path: '/stock-requests',
    name: 'stock-requests',
    component: () => import('@/views/pages/warehouse/stock-request/Index.vue'),
  },
  {
    path: '/master-files',
    name: 'master-files',
    component: () => import('@/views/pages/master-files/MasterFiles.vue'),
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/views/pages/master-files/terms/IndexPage.vue'),
  },
  {
    path: '/vats',
    name: 'vats',
    component: () => import('@/views/pages/master-files/vats/IndexPage.vue'),
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/views/pages/master-files/customers/IndexPage.vue'),
  },
  {
    path: '/sales-orders',
    name: 'sales-orders',
    component: () => import('@/views/pages/sales/orders/Index.vue'),
  },
  {
    path: '/sales-drs/create',
    name: 'create-sales-dr',
    component: () => import('@/views/pages/sales/drs/SalesDrCreatePage.vue'),
  },
  {
    path: '/sales-drs',
    name: 'sales-drs',
    component: () => import('@/views/pages/sales/drs/Index.vue'),
  },
  {
    path: '/unit-packing',
    name: 'unit-packing',
    component: () => import('@/views/pages/master-files/unit-packing/IndexPage.vue'),
  },
  {
    path: '/finish-products',
    name: 'finish-products',
    component: () => import('@/views/pages/master-files/finish-products/IndexPage.vue'),
  },
  {
    path: '/raw-materials',
    name: 'raw-materials',
    component: () => import('@/views/pages/master-files/raw-materials/Index.vue'),
  },
  {
    path: '/collections',
    name: 'collections',
    component: () => import('@/views/pages/sales/collections/Index.vue'),
  },
  {
    path: '/collections/dr/:id',
    name: 'collection-page',
    component: () => import('@/views/pages/sales/collections/CollectionByQR.vue'),
  },
  {
    path: '/bounced-deposits',
    name: 'bounced-deposits',
    component: () => import('@/views/pages/sales/bounced-deposits/Index.vue'),
  },
  {
    path: '/bounced-deposits/:id',
    name: 'edit-bounced-deposits',
    component: () => import('@/views/pages/sales/bounced-deposits/EditBouncedDepositForm.vue'),
  },
  {
    path: '/deposits',
    name: 'deposits',
    component: () => import('@/views/pages/sales/deposits/Index.vue'),
  },
  {
    path: '/deposits/:id',
    name: 'edit-deposits',
    component: () => import('@/views/pages/sales/deposits/EditDepositForm.vue'),
  },
  {
    path: '/trip-tickets',
    name: 'trip-tickets',
    component: () => import('@/views/pages/logistics/trip-tickets/Index.vue'),
  },
  {
    path: '/accounts-receivables',
    name: 'accounts-receivables',
    component: () => import('@/views/pages/reports/accounts-receivable/Index.vue'),
  },
  {
    path: '/subsidiary-ledger',
    name: 'subsidiary-ledger',
    component: () => import('@/views/pages/reports/accounts-receivable/SubsidiaryLedger.vue'),
  },
  {
    path: '/customer-aging/:cId?',
    name: 'customer-aging',
    component: () => import('@/views/pages/reports/accounts-receivable/CustomerAging.vue'),
    props: { newsletterPopup: false }
  },
  {
    path: '/inventory-reports',
    name: 'inventory-reports',
    component: () => import('@/views/pages/reports/inventory-reports/Index.vue'),
  },
  {
    path: '/stockcard-report',
    name: 'stockcard-report',
    component: () => import('@/views/pages/reports/inventory-reports/StockcardReport.vue'),
  },
  {
    path: '/stockcard-generated-report',
    name: 'stockcard-generated-report',
    component: () => import('@/views/pages/reports/inventory-reports/StockcardGeneratedReport.vue'),
  },
  {
    path: '/physical-counts',
    name: 'physical-counts',
    component: () => import('@/views/pages/physical-counts/Index.vue'),
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('user')
//
//   if (authRequired && !loggedIn) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
