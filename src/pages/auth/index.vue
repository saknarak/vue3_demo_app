<route lang="yaml">
meta:
  layout: public
</route>

<template>
  <div>
    <ui-frame>
      <ui-card class="login-panel">
        <ui-card-title class="title pa-3">
          PROJECT LOGIN
        </ui-card-title>
        <ui-card-text class="pa-3">
          <ui-form :disabled="busy">
            <div>
              <ui-label style="height: 24px; line-height: 24px;">
                User
              </ui-label>
            </div>
            <div class="d-flex">
              <ui-input
                ref="user"
                v-model="user"
                class="flex-grow-1"
                prefix-icon="face"
                :disabled="busy"
                autofocus
              />
            </div>
            <div class="d-flex">
              <ui-label style="height: 24px; line-height: 24px;">
                Password
              </ui-label>
            </div>
            <div class="d-flex">
              <ui-input
                ref="pass"
                v-model="pass"
                :type="showPass ? 'text' : 'password'"
                class="flex-grow-1"
                prefix-icon="lock"
                :disabled="busy"
                @keypress.enter.stop="doSignIn"
              >
                <template #inner-suffix>
                  <ui-icon :icon="showPass ? 'visibility' : 'visibility_off'" @click="showPass = !showPass" />
                </template>
              </ui-input>
            </div>
            <div class="d-flex mt-6">
              <ui-btn prefix-icon="login" class="flex-grow-1" style="background-color: #F6A704" @click.stop="doSignIn" :disabled="busy">
                Sign-in
              </ui-btn>
            </div>
          </ui-form>
        </ui-card-text>
        <ui-card-text class="pa-3 d-flex">
          <ui-btn prefix-icon="help_outline" class="flex-grow-1" @click="$router.push('/auth/forgot')">
            Forgot user or password
          </ui-btn>
        </ui-card-text>
        <div class="flex-grow-1" />
        <ui-card-text class="flex-grow-0 flex-shrink-0 pa-3 text-center">
          copyright &copy; 2021
        </ui-card-text>
      </ui-card>
    </ui-frame>
  </div>
</template>

<script setup>
// let busy = ref(false)
// </script>

<script>
import { ref } from 'vue'

export default {
  setup() {
    let busy = ref(false)
    let user = ref('')
    let pass = ref('')
    let showPass = ref(false)
    const doSignIn = async function() {

    }
    return {
      busy,
      user,
      pass,
      showPass,
      doSignIn,
    }
  },
}
</script>
