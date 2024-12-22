<template>
  <q-item
    clickable
    tag="a"
    :to="props.link"
  >

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon
       :name="props.icon" />
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    default: '#'
  },
  icon:{
    required: true
  }
})
</script>
