<template lang="pug">
transition(name="modal-fade")
  .custom-modal(v-if="show")
    .custom-modal-content
      .custom-modal-header(v-if="$slots['modal-header']")
        .custom-modal-header-slot
          slot(name="modal-header")
        button.close-modal(@click="$emit('close')")
          i.fas.fa-times
      .custom-modal-body(v-if="$slots['modal-body']")
        slot(name="modal-body")
      .custom-modal-footer(v-if="$slots['modal-footer']")
        slot(name="modal-footer")
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./styles.scss"></style>
