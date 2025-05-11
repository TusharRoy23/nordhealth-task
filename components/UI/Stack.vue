<template>
    <provet-stack 
        :gap="gap"
        :style="{
            maxWidth: width,
            margin: margin
        }"
    >
        <slot />
    </provet-stack>
</template>
<script setup lang="ts">
interface Props {
    gap?: "none" | "xs" | "s" | "m" | "l" | "xl" | "xxl"
    width?: string
    margin?: string
}
withDefaults(defineProps<Props>(), {
    gap: 'm',
    width: undefined,
    margin: undefined
})
</script>