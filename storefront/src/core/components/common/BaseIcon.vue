<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = withDefaults(
  defineProps<{
    icon: string;
    width?: number;
    height?: number;
    fill?: string;
  }>(),
  {
    width: 16,
    height: 16,
    fill: "currentColor",
  },
);

const loadIcon = defineAsyncComponent(
   () => import(`@/assets/icons/${props.icon}.svg`)
);
</script>

<template>
    <component
      :is="loadIcon"
      class="icon"
      :class="`icon-${icon}`"
      :width="width"
      :height="height"
      :fill="fill"
    />
</template>

<style scoped lang="scss">
.icon {
  color: currentColor;
  cursor: pointer;
}

.big {
  .icon {
    width: 20px;
    height: 20px;
  }
}

.primary {
  color: $color-primary;
}

.disabled {
  .icon {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover,
  &:focus {
    //color: $color-icons;
  }
}

.pointer {
  cursor: pointer;
}
</style>
