<template>
    <provet-card>
        <div slot="header" v-if="$slots.cardHeader">
            <slot name="cardHeader" />
        </div>
        <slot />
        <div slot="footer" v-if="$slots.cardFooter">
            <slot name="cardFooter" />
        </div>
    </provet-card>
</template>