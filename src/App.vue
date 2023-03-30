<template lang="pug">
div(:class="{darkmode: getDarkmode}")
  router-view
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['getDarkmode'])
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Aclonica&display=swap');

* {
  padding: 0;
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;
}

body{
  overflow: hidden;
}

.darkmode {
  .vue-slider {
    .vue-slider-rail {
      background-color: rgba(#fff, 0.25);
      &:hover{
        background-color: rgba(#fff, 0.5);
      }
    }
  }
}

.vue-slider {
  &.vue-slider-disabled{
    .vue-slider-process {
      background-color: #005e6a55 !important;
    }
  }
  &:hover {
    .vue-slider-process {
      background-color: #005e6a;
    }
  }
  .vue-slider-rail {
    .vue-slider-process {
      background-color: #005e6a;
      &:hover {
        background-color: #005e6a;
      }
    }
  }
  .vue-slider-dot {
    .vue-slider-dot-handle {
      border-color: #005e6a;
      transform: translateX(-50%);
    }
  }
}

::-webkit-scrollbar {
  width: 7px;
  border-radius: $border-radius;
}
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: $border-radius;
}
::-webkit-scrollbar-thumb {
  background: #00000022;
  border-radius: $border-radius;
  &:hover {
    background: #00000044;
  }
}
</style>
