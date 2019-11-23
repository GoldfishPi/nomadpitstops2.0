<template lang="pug">
    v-container(fill-height)
        v-card(flat outlined class="profile")
            v-card-text
                h1 Settings
                v-tabs(v-model="tab")
                    v-tab Profile
                    v-tab Notifications
                v-tabs-items(v-model="tab")
                    v-tab-item
                        v-card(flat outlined)
                            v-img(height="200" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png")
                            v-card-text
                                |     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            v-card-actions
                                v-btn(text color="primary") Change Bio
                    v-tab-item
                        v-switch(label="Email me about new blog posts" color="primary")
                        v-switch(label="Email me about comments on my pit stops" color="primary")
                        v-switch(label="Enable desktop notifications" color="primary")
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from "../../types/types";
export default Vue.extend({
    mounted() {
        console.log('stuff', this.tab);
    },
    data:() => ({
        tab:null
    })
})
</script>

<style scoped>
.profile {
    height: 100%;
    width:100%;
}
.pitstop {
    margin-bottom:1rem;
}
</style>
