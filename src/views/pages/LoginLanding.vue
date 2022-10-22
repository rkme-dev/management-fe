<template>
  <div class="auth-wrapper auth-v1 login-landing">
    <div class="auth-inner">
      <v-card class="auth-card">
        <v-card-text>
          <h1 class="text-2xl font-weight-semibold text--primary mb-2">Welcome!</h1>
          <p class="mb-2">Please sign-in to your account and start the adventure.</p>
        </v-card-text>

        <v-list dense class="item-list-container">
          <v-list-item v-for="link in links" :key="link.path" link>
            <router-link :to="link.path" />
            <v-list-item-content class="item-list">
              <img
                class="auth-tree"
                width="247"
                height="185"
                :src="require('../../assets/images/logos/' + link.img + '.svg')"
                :alt="link.img"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
    />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: [
        { title: 'Enco', path: '/pages/login-admin', img: 'ECO PAPER' },
        { title: 'Eco', path: '/pages/login-admin', img: 'ENCO' },
      ],
    }
  },
}
</script>
<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
.auth-wrapper.login-landing {
  &.auth-v1 {
    .auth-inner {
      margin-top: -10rem;
      width: 22rem !important;
      .v-card__text {
        padding: 10px;
      }
      .item-list-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .v-list-item {
          background-color: #cecce5;
          border-radius: 7px;
          min-height: auto;
          padding: 15px;
          width: 9rem;
          flex: unset;
          @media (max-width: 490px) {
            width: 33vw;
            min-width: 6rem;
          }
          a {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
          }
        }
        .v-list-item__content {
          &.item-list {
            position: relative;
            img {
              height: 100px;
              width: 100%;
              object-fit: contain;
              position: relative;
              @media (max-width: 600px) {
                display: block !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
