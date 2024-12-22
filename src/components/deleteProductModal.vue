<template>
  <q-dialog
    dir="rtl"
    v-model="alert"
    persistent
    :maximized="false"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-pa-md bg-white text-dark"
      style="max-width: 400px; border-radius: 12px; box-shadow: 0 4px 25px rgba(0, 0, 0, 0.2);">

      <q-card-section class="text-center">
        <q-icon name="warning" size="50px" color="negative" class="q-mb-md" />
        <div class="text-h6 text-weight-bold">حذف محصول</div>
      </q-card-section>

      <q-card-section class="q-pt-md text-body1">
        <p>ایا از حذف <strong>{{ props.productData.name }}</strong> اطمینان دارید؟</p>
        <p class="text-grey-7">این عمل غیرقابل بازگشت است.</p>
      </q-card-section>

      <q-card-actions align="center" class="q-mt-md">
        <q-btn
          @click="deletepro"
          class="text-h6 q-ml-md"
          label="تایید"
          color="primary"
          icon="check"
          :loading="isLoading"
          :disable="isLoading"
          unelevated
        />

        <q-btn
          class="text-h6"
          label="انصراف"
          color="negative"
          icon="close"
          v-close-popup
          unelevated
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(false);
const props = defineProps({
  productData: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['deleteProductDiag']);
const alert = defineModel({ default: false });

async function deletepro() {
  isLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    emit('deleteProductDiag', true);
  } finally {
    isLoading.value = false;
    alert.value = false;
  }
}
</script>

<style scoped>
.q-card {
  border-radius: 12px;
}

.q-btn {
  min-width: 120px;
  padding-left: 1.5rem;

}
</style>
