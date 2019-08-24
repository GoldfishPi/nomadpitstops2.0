
<template>
    <v-container fill-height>
        <v-layout fill-height>
            <v-flex>
                <v-card class="main">
                    <v-img max-height="500" aspect-ratio="1" src="https://www.sackettwaconia.com/wp-content/uploads/default-profile.png">
                        <v-spacer></v-spacer>
                        <v-card-title class="pl12 pt-12">
                            <div class="siplay-1 pl-12 pt-12">Erik Badger</div>
                        </v-card-title>
                    </v-img>
                    <v-row class="fill-height">
                    <v-card-text>
                        <v-list>
                            <v-list-item>
                                <v-list-icon>
                                    <v-icon>fas fa-user</v-icon>
                                </v-list-icon>
                                <v-list-title>Erik Badger</v-list-title>
                            </v-list-item>
                            <v-divider></v-divider>
                        </v-list>
                    </v-card-text>
                    </v-row>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
});
</script>

<style scoped>
</style>
