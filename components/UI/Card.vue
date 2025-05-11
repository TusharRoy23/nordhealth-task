<template>
  <provet-card>
    <div v-if="$slots.cardHeader" v-bind="{ slot: 'header' }">
      <slot name="cardHeader" />
    </div>
    <slot />
    <div v-if="$slots.cardFooter" v-bind="{ slot: 'footer' }">
      <slot name="cardFooter" />
    </div>
  </provet-card>
</template>
