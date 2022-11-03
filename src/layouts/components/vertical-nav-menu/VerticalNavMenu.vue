<template xmlns="http://www.w3.org/1999/html">
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="290"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <v-slide-x-transition>
          <h2 class="app-title text--primary">
            Enco Group
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list
      v-for="(item, index) in navigations"
      :key="index"
      expand
      shaped
      class="vertical-nav-menu-items pr-5"
    >
      <nav-menu-link
        v-if="!item.children"
        :title="item.title"
        :to="{ name: item.link }"
        :icon="item.icon"
      ></nav-menu-link>

      <nav-menu-group
        v-else
        :title="item.title"
        :icon="item.icon"
      >
        <div
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
        >
          <nav-menu-link
            :title="subItem.title"
            :to="{ name: subItem.link }"
            :icon="subItem.icon"
          ></nav-menu-link>
        </div>
      </nav-menu-group>
    </v-list>
    <!--    <v-list-->
    <!--      expand-->
    <!--      shaped-->
    <!--      class="vertical-nav-menu-items pr-5"-->
    <!--    >-->
    <!--      <nav-menu-link-->
    <!--        title="Dashboard"-->
    <!--        :to="{ name: 'dashboard' }"-->
    <!--        :icon="icons.mdiHomeOutline"-->
    <!--      ></nav-menu-link>-->
    <!--      &lt;!&ndash;      <nav-menu-link&ndash;&gt;-->
    <!--      &lt;!&ndash;        title="Account Settings"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :to="{ name: 'pages-account-settings'}"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :icon="icons.mdiAccountCogOutline"&ndash;&gt;-->
    <!--      &lt;!&ndash;      ></nav-menu-link>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <nav-menu-group&ndash;&gt;-->
    <!--      &lt;!&ndash;        title="Pages"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :icon="icons.mdiFileOutline"&ndash;&gt;-->
    <!--      &lt;!&ndash;      >&ndash;&gt;-->
    <!--      &lt;!&ndash;        <nav-menu-link&ndash;&gt;-->
    <!--      &lt;!&ndash;          title="Login"&ndash;&gt;-->
    <!--      &lt;!&ndash;          :to="{ name: 'pages-login' }"&ndash;&gt;-->
    <!--      &lt;!&ndash;          target="_blank"&ndash;&gt;-->
    <!--      &lt;!&ndash;        ></nav-menu-link>&ndash;&gt;-->
    <!--      &lt;!&ndash;        <nav-menu-link&ndash;&gt;-->
    <!--      &lt;!&ndash;          title="Register"&ndash;&gt;-->
    <!--      &lt;!&ndash;          :to="{ name: 'pages-register' }"&ndash;&gt;-->
    <!--      &lt;!&ndash;          target="_blank"&ndash;&gt;-->
    <!--      &lt;!&ndash;        ></nav-menu-link>&ndash;&gt;-->
    <!--      &lt;!&ndash;        <nav-menu-link&ndash;&gt;-->
    <!--      &lt;!&ndash;          title="Error"&ndash;&gt;-->
    <!--      &lt;!&ndash;          :to="{ name: 'error-404' }"&ndash;&gt;-->
    <!--      &lt;!&ndash;          target="_blank"&ndash;&gt;-->
    <!--      &lt;!&ndash;        ></nav-menu-link>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </nav-menu-group>&ndash;&gt;-->
    <!--      <nav-menu-link-->
    <!--        title="Purchase Orders"-->
    <!--        :icon="icons.mdiCardAccountDetailsStarOutline"-->
    <!--        :to="{ name: 'purchase-orders' }"-->
    <!--      ></nav-menu-link>-->
    <!--      <nav-menu-group-->
    <!--        title="Sales"-->
    <!--        :icon="icons.mdiChartBellCurveCumulative"-->
    <!--      >-->
    <!--        <nav-menu-link-->
    <!--          title="Clients"-->
    <!--          :icon="icons.mdiCardAccountDetailsStarOutline"-->
    <!--          :to="{ name: 'sales-clients' }"-->
    <!--        ></nav-menu-link>-->
    <!--      </nav-menu-group>-->
    <!--      <nav-menu-link-->
    <!--        title="Suppliers"-->
    <!--        :icon="icons.mdiCardAccountDetailsStarOutline"-->
    <!--        :to="{ name: 'suppliers' }"-->
    <!--      ></nav-menu-link>-->
    <!--      <nav-menu-link-->
    <!--        title="Warehouse"-->
    <!--        :icon="icons.mdiWarehouse"-->
    <!--        :to="{ name: 'warehouse page' }"-->
    <!--      ></nav-menu-link>-->
    <!--      <nav-menu-group-->
    <!--        title="User Control"-->
    <!--        :icon="icons.mdiEyeSettings"-->
    <!--      >-->
    <!--        <nav-menu-link-->
    <!--          title="Users"-->
    <!--          :to="{ name: 'users' }"-->
    <!--          :icon="icons.mdiHuman"-->
    <!--        ></nav-menu-link>-->
    <!--        <nav-menu-link-->
    <!--          title="Departments"-->
    <!--          :to="{ name: 'departments' }"-->
    <!--          :icon="icons.mdiAccountGroup"-->
    <!--        ></nav-menu-link>-->
    <!--        <nav-menu-link-->
    <!--          title="Access Levels"-->
    <!--          :to="{ name: 'access-levels' }"-->
    <!--          :icon="icons.mdiLockOpenOutline"-->
    <!--        ></nav-menu-link>-->

    <!--        <nav-menu-link-->
    <!--          title="Roles"-->
    <!--          :to="{ name: 'roles' }"-->
    <!--          :icon="icons.mdiCarKey"-->
    <!--        ></nav-menu-link>-->
    <!--        <nav-menu-link-->
    <!--          title="Abilities"-->
    <!--          :to="{ name: 'abilities' }"-->
    <!--          :icon="icons.mdiCog"-->
    <!--        ></nav-menu-link>-->
    <!--      </nav-menu-group>-->
    <!--      &lt;!&ndash;      <nav-menu-section-title title="USER INTERFACE"></nav-menu-section-title>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <nav-menu-link&ndash;&gt;-->
    <!--      &lt;!&ndash;        title="Typography"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :to="{ name: 'typography' }"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :icon="icons.mdiAlphaTBoxOutline"&ndash;&gt;-->
    <!--      &lt;!&ndash;      ></nav-menu-link>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <nav-menu-link&ndash;&gt;-->
    <!--      &lt;!&ndash;        title="Icons"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :to="{ name: 'icons' }"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :icon="icons.mdiEyeOutline"&ndash;&gt;-->
    <!--      &lt;!&ndash;      ></nav-menu-link>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <nav-menu-link&ndash;&gt;-->
    <!--      &lt;!&ndash;        title="Cards"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :to="{ name: 'cards' }"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :icon="icons.mdiCreditCardOutline"&ndash;&gt;-->
    <!--      &lt;!&ndash;      ></nav-menu-link>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <nav-menu-link&ndash;&gt;-->
    <!--      &lt;!&ndash;        title="Tables"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :to="{ name: 'simple-table' }"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :icon="icons.mdiTable"&ndash;&gt;-->
    <!--      &lt;!&ndash;      ></nav-menu-link>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <nav-menu-link&ndash;&gt;-->
    <!--      &lt;!&ndash;        title="Form Layouts"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :to="{ name: 'form-layouts' }"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :icon="icons.mdiFormSelect"&ndash;&gt;-->
    <!--      &lt;!&ndash;      ></nav-menu-link>&ndash;&gt;-->
    <!--    </v-list>-->
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiCardAccountDetailsStarOutline,
  mdiChartBellCurveCumulative,
  mdiFormSelect,
  mdiAccountCogOutline,
  mdiEyeSettings,
  mdiHuman,
  mdiCarKey,
  mdiCog,
  mdiWarehouse, mdiAccountGroup, mdiCurrencySign,
} from '@mdi/js'
import { ref } from '@vue/composition-api'
import store from '@/store'
import NavMenuGroup from './components/NavMenuGroup.vue'
import NavMenuLink from './components/NavMenuLink.vue'

export default {
  components: {
    NavMenuGroup,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  setup() {
    const navigations = ref([
      {
        title: 'Dashboard',
        link: 'dashboard',
        icon: mdiHomeOutline,
      },
      {
        title: 'Sales',
        icon: mdiChartBellCurveCumulative,
        permission: 'view-client-list',
        children: [
          {
            title: 'Sales Orders',
            icon: mdiCardAccountDetailsStarOutline,
            link: 'sales-orders',
          },
          {
            title: 'Sales Drs',
            icon: mdiEyeSettings,
            link: 'sales-drs',
          },
          {
            title: 'Collections',
            icon: mdiCurrencySign,
            link: 'collections',
          },
          {
            title: 'Deposits',
            icon: mdiCurrencySign,
            link: 'deposits',
          },
          {
            title: 'Bounced Deposits',
            icon: mdiCurrencySign,
            link: 'bounced-deposits',
          },
        ],
      },
      {
        title: 'Logistics',
        icon: mdiChartBellCurveCumulative,
        permission: 'view-client-list',
        children: [
          {
            title: 'Trip Ticket',
            icon: mdiCardAccountDetailsStarOutline,
            link: 'trip-tickets',
          },
        ],
      },
      {
        title: 'Reports',
        icon: mdiChartBellCurveCumulative,
        permission: 'view-client-list',
        children: [
          {
            title: 'Accounts Receivable',
            icon: mdiCardAccountDetailsStarOutline,
            link: 'accounts-receivables',
          },
        ],
      },
      {
        title: 'Physical Counts',
        link: 'physical-counts',
        permission: 'view-supplier-list',
        icon: mdiChartBellCurveCumulative,
      },
      {
        type: 'sub-menu',
        title: 'Purchase Orders',
        link: 'purchase-orders',
        permission: 'view list-purchase order',
        icon: mdiCardAccountDetailsStarOutline,
      },
      {
        title: 'Suppliers',
        link: 'suppliers',
        permission: 'view-supplier-list',
        icon: mdiCardAccountDetailsStarOutline,
      },
      {
        title: 'Warehouse',
        link: 'warehouse page',
        icon: mdiWarehouse,
      },
      {
        title: 'User Control',
        icon: mdiEyeSettings,
        link: 'user-access-menu',
      },
      {
        title: 'Master Files',
        icon: mdiEyeSettings,
        link: 'master-files',
      },
    ])

    const isSuperAdmin = store.getters['AuthStore/hasAbility']('*')

    if (isSuperAdmin === false) {
      navigations.value = navigations.value.filter(navigation => {
        if (navigation.children) {
          // eslint-disable-next-line no-param-reassign
          navigation.children = navigation.children.filter(subNavigation => {
            if (subNavigation.permission === undefined) {
              return subNavigation
            }

            const hasAbility = store.getters['AuthStore/hasAbility'](subNavigation.permission)

            if (hasAbility === false) {
              // eslint-disable-next-line consistent-return
              return
            }

            // eslint-disable-next-line consistent-return
            return subNavigation
          })

          if (navigation.children.length > 0) {
            return navigation
          }
        } else {
          if (navigation.permission === undefined) {
            return navigation
          }

          const hasAbility = store.getters['AuthStore/hasAbility'](navigation.permission)

          if (hasAbility === false) {
            // eslint-disable-next-line consistent-return
            return
          }

          // eslint-disable-next-line consistent-return
          return navigation
        }
      })
    }

    return {
      navigations,
      icons: {
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiCardAccountDetailsStarOutline,
        mdiChartBellCurveCumulative,
        mdiFormSelect,
        mdiAccountCogOutline,
        mdiEyeSettings,
        mdiWarehouse,
        mdiHuman,
        mdiCarKey,
        mdiCog,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

// You can remove below style
// Upgrade Banner
.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
