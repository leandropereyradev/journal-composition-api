<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span class="login100-form-title p-b-41">
    Registrarse
  </span>
  <form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">

    <div class="wrap-input100 validate-input" data-validate="Ingrese su nombre">
      <input v-model="userForm.name" class="input100" type="text" placeholder="Ingrese su nombre" required>
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>
    <div class="wrap-input100 validate-input" data-validate="Ingrese correo">
      <input v-model="userForm.email" class="input100" type="text" placeholder="Ingrese correo" required>
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Ingrese contraseña">
      <input v-model="userForm.password" class="input100" type="password" placeholder="Ingrese contraseña" required>
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button type="submit" class="login100-form-btn">
        Registrarse
      </button>

    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'


export default {
  setup() {
    const router = useRouter()

    const { createUser } = useAuth()

    const userForm = ref({
      name: '',
      email: '',
      password: '',
    })

    return {
      userForm,

      onSubmit: async () => {
        const { ok, message } = await createUser(userForm.value)

        if (!ok) return Swal.fire('Error', message, 'error')

        router.push({ name: 'non-entry' })
      }
    }
  }

}
</script>

<style></style>