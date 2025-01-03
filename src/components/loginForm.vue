<template>

  <div >
    <q-form>
      <h3>سلام روژایی عزیز :)</h3>
      <h5>لطفا شماره تماس خود را وارد نمایید</h5>
      <q-input v-model="username" filled/>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('')
</script>
