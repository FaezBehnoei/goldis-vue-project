<template>
  <q-layout>
    <q-page-container dir="rtl" class="q-pa-lg">

      <q-btn
        @click="openModel"
        label="افزودن محصول جدید"
        color="primary"
        class="q-mb-md"
        style="min-width: 200px;"
        unelevated
      />

      <q-page>
        <q-card>
          <q-card-section>
            <q-table
              title="محصولات"
              :rows="rows"
              :columns="columns"
              row-key="id"
              bordered
              class="shadow-1"
            >
              <template #body-cell-image="props">
                <q-td :props="props">
                  <q-img
                    :src="props.row.image"
                    style="width: 50px; height: 50px; border-radius: 50%;"
                    :alt="props.row.name"
                  />
                </q-td>
              </template>

              <template #body-cell-action="props">
                <q-td :props="props">
                  <q-btn
                    @click="editProduct(props.row)"
                    label="ویرایش"
                    class="bg-positive text-white q-ma-xs q-pa-sm"
                    round
                    size="sm"
                  />
                  <q-btn
                    label="حذف"
                    round
                    class="bg-negative text-white q-ma-xs q-pa-sm "
                    @click="deleteProduct(props.row)"
                    size="sm"
                  />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-page>

      <add-product-dialog
        :productData="productData"
        @update="onupdate"
        @seccess="onsuccess"
        v-model="showModel"
      />

      <deleteProductModal
        :productData="productData"
        v-model="showDeleteModel"
        @deleteProductDiag="deleteProductDiag"
      />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';
import addProductDialog from 'src/components/addProductDialog.vue';
import deleteProductModal from 'src/components/deleteProductModal.vue';

const showDeleteModel = ref(false);
const columns = [
  {
    name: 'id',
    required: true,
    label: 'شناسه',
    align: 'center',
    field: row => row.id,
    sortable: true
  },
  {
    name: 'name',
    required: true,
    label: 'نام محصول',
    align: 'center',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'price',
    required: true,
    label: 'قیمت',
    align: 'center',
    field: row => row.price,
    sortable: true
  },
  {
    name: 'image',
    required: true,
    label: 'تصویر',
    align: 'center',
    field: row => row.image,
    sortable: true
  },
  {
    name: 'action',
    required: true,
    label: 'عملیات',
    align: 'center',
    sortable: true
  }
];

const productId = ref('');
const rows = ref([]);
const showModel = ref(false);
const productData = ref({});

async function FetchUsers() {
  const { data } = await api.get('/products');
  rows.value = data;
}

onMounted(FetchUsers)

function openModel() {
  showModel.value = !showModel.value;
  productData.value = ""
}

function onsuccess(form) {
  rows.value.unshift(form);
}

function editProduct(data) {
  productData.value = data;
  showModel.value = !showModel.value;
}

function onupdate(data) {
  const rowIndex = rows.value.findIndex(({ id }) => id == data.id);
  rows.value[rowIndex] = data;

}

function deleteProduct(data) {
  showDeleteModel.value = !showDeleteModel.value;
  productId.value = data.id;
  productData.value = data;
}

async function deleteProRequest(productId) {
  await api.delete(`/products/${productId}`);
  console.log(productId)
}

async function deleteProductDiag() {

    await deleteProRequest(productId.value);

  const rowIndex = rows.value.findIndex(({ id }) => id == productId.value);
  rows.value.splice(rowIndex, 1);
}
</script>

<style scoped>
.q-page-container {
  background-color: #f5f5f5;
}

.q-card {
  margin-top: 20px;
}

.q-table {
  margin-top: 10px;
}

.q-table__header {
  background-color: #1976D2;
  color: white;
}

.q-table__body tr:hover {
  background-color: #e0e0e0;
}
</style>
