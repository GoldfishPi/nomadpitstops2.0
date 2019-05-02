<template>
    <v-dialog v-model="active">
        <v-card>
            <v-toolbar tabs>
                <v-tabs v-model="tabs">
                    <v-tab>Login</v-tab>
                    <v-tab>Sign Up</v-tab>
                </v-tabs>
            </v-toolbar>

            <v-tabs-items v-model="tabs">
                <v-tab-item>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field label="Email*" required v-model="username"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                label="Password*"
                                type="password"
                                required
                                v-model="password"
                            ></v-text-field>
                        </v-flex>
                        <v-flex right>
                            <v-btn v-on:click="onLogin()">Login</v-btn>
                        </v-flex>
                    </v-layout>
                </v-tab-item>
                <v-tab-item>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field label="Email*" required v-model="username"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                label="Password*"
                                type="password"
                                required
                                v-model="password"
                            ></v-text-field>
                        </v-flex>
                        <v-flex right>
                            <v-btn v-on:click="onSignUp()">Sign Up</v-btn>
                        </v-flex>
                    </v-layout>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            tabs: null,
            username: '',
            password: ''
        };
    },
    computed: {
        active() {
            return this.$store.state.login.active;
        }
    },
    methods: {
        async onSignUp() {
            console.log('signing up...', this.$firebase);
            await this.$firebase
                .auth()
                .createUserWithEmailAndPassword(this.username, this.password);
            this.$store.commit('login/setActive', false);
        },
        async onLogIn() {
            await this.$firebase
                .auth()
                .signInWithEmailAndPassword(this.username, this.password);
            this.$store.commit('login/setActive', false);
        }
    }
};
</script>

<style>
</style>
