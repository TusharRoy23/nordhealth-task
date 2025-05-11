<template>
    <provet-header slot="header">
        <router-link :to="{ path: '/' }" class="no-underline">
            <h1 class="n-typescale-l">NordHealth</h1>
        </router-link>
    </provet-header>
</template>
<style lang="css" scoped>
    .no-underline {
        text-decoration: none;
    }
</style>