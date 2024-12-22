<template>
  <div dir="rtl" class="q-pa-md q-gutter-md">
    <q-dialog v-model="alert" @show="onShow">
      <q-card dir="rtl" class="q-pa-none" style="max-width: 400px; min-width: 300px;">
        <q-card-section class="bg-primary text-white text-h6 q-py-sm q-px-md">
          <div class="text-center font-weight-bold">
            {{ isEdit ? 'ویرایش محصول' : 'افزودن محصول جدید' }}
          </div>
        </q-card-section>

        <q-card-section dir="rtl" class="q-pt-md q-pb-none">
          <q-form  @submit.prevent="onSubmit" class="q-gutter-md  column">
            <div class="q-mb-md flex column">
              <q-input
                filled
                label="نام محصول"
                v-model="form.name"
                :rules="[validation]"
                lazy-rules
                color="primary"
                autofocus
                hint="لطفاً نام محصول را وارد کنید"
                class="q-mt-xs "
              />
            </div>

            <div class="q-mb-md">
              <q-input
                filled
                label="قیمت محصول"
                v-model="form.price"
                type="number"
                :rules="[validation]"
                lazy-rules
                color="primary"
                hint="قیمت محصول را به عدد وارد کنید"
                class="q-mt-xs"
              />
            </div>

            <q-btn
              type="submit"
              :label="isEdit ? 'ویرایش محصول' : 'افزودن محصول'"
              color="accent"
              class=" q-mt-md q-mb-sm"
              :loading="loading"
              :disable="loading"
              loading-label="در حال ارسال..."
              size="large"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { api } from 'src/boot/axios';
import { validation } from '../utils/rules';

const props = defineProps(['productData']);
const isEdit = computed(() => !!props.productData.id);
const emit = defineEmits(['seccess']);
const form = ref({
  name: null,
  price: null
});
const alert = defineModel({
  default: false
});
const loading = ref(false);

function onShow() {
  if(isEdit.value){
    form.value = { ...props.productData };
  }else{
    form.value = { name: '', price: '' };
  }
}

async function onSubmit() {
  loading.value = true;


  try {
    const config = {
      url: isEdit.value ? `/products/${props.productData.id}` : '/products',
      method: isEdit.value ? 'put' : 'post',
      data: form.value
    };

    const { data: formData } = await api(config);
    alert.value = false;

    form.value = { name: '', price: '' };

    isEdit.value ? emit('update', formData) : emit('seccess', formData);
  } finally {
    loading.value = false;
  }
}
</script>
