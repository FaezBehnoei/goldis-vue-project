<template>
  <div  dir="rtl" class="flex row">
    <div style="width: 60vw;">
      <q-btn outline round="30px" class="q-mr-md q-mt-md my-custom-font-bold-dana q-pa-none q-pl-lg text-h7" icon="chevron_right" label="بازگشت"  />
      <login-form />
    </div>
    <div style="height: 100vh;" class="flex column justify-center">
      <q-img src="../../public/login.jpg" style="width: 40vw; height: auto;" />
    </div>
  </div>
</template>

<script setup>
import loginForm from 'src/components/loginForm.vue';
</script>
