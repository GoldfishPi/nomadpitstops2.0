<template>
    <v-list three-line>
        <v-list-item v-for="c in comments" :key="c">
            <v-list-item-avatar>
                <v-img
                    src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
                    ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>
                    {{c.user.displayName}} 
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{c.text}}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    propsData:{
        comments:[]
    }
});
</script>
