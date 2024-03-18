<template>
  <v-container class="navbar">
    <v-app-bar
        color="purple"
        density="compact"
    >
      <router-link to="/" class="ml-3">
        $ DOLLAR SERVICE $
      </router-link>
      <v-spacer />
      <div v-if="!isAuthenticated">
        <router-link to="/login" style="color:white">
          <v-btn variant="outlined" class="mr-3">
            Вход
          </v-btn>
        </router-link>
        <router-link to="/register" style="color:white">
          <v-btn variant="outlined" class="mr-3">
            Регистрация
          </v-btn>
        </router-link>
      </div>
      <div v-else>
        <router-link to="/info" class="ml-3">
          Пользователь: {{ userEmail }}
        </router-link>
        <v-btn variant="outlined" class="mx-3" @click="onLogout">
          Выход
        </v-btn>
      </div>
    </v-app-bar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  GET_USER_EMAIL,
  IS_USER_AUTHENTICATED_GETTER,
  LOGOUT_ACTION
} from "@/store/storeConstants";
export default {
  computed: {
    ...mapGetters('auth', {
      isAuthenticated: IS_USER_AUTHENTICATED_GETTER
    }),
    ...mapGetters('auth', {
      userEmail: GET_USER_EMAIL
    })
  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION
    }),
    onLogout() {
      this.logout();
      this.$router.replace('/');
    }
  }
}
</script>

<style scoped>
a:link, a:visited {
  color: white;
  text-decoration: none;
}
.navbar {
  margin-bottom: 50px;
}
</style>