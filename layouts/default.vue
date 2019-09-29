<template>
    <v-app>
        <Nav :menu="menu" :loggedIn="loggedIn" @login="onLogin()" @signout="onSignout()" @drawer="drawer = true">
        </Nav>
        <v-content>
            <nuxt/>
        </v-content>
        <v-navigation-drawer fixed right v-model="drawer"  class="hidden-md-and-up">
            <v-list-item v-for="item in menu" :key="item.link" nuxt :to="item.link">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="title">
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="!this.loggedIn" @click="onLogin()">
                <v-list-item-icon>
                    <v-icon>fas fa-user</v-icon>
                </v-list-item-icon>
                <v-list-item-content  class="title">    
                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="this.loggedIn" @click="onLogin()">
                <v-list-item-icon>
                    <v-icon>fas fa-user</v-icon>
                </v-list-item-icon>
                <v-list-item-content  class="title">    
                    <v-list-item-title>Signout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-navigation-drawer>
    </v-app-bar>

    <SignUp 
        v-model="signUpDialog"
        @cancel="signUpDialog = false"
        @close="signUpDialog = false"
        @done="signup($event)"
    ></SignUp>

    <Login
        v-model="loginDialog"
        @cancel="loginDialog = false"
        @signUp="loginDialog = false; signUpDialog = true"
        @done="login($event)"
    ></Login>

    <v-snackbar
       v-model="loginSuccessSnackbar"
       color="success"
       :top="true">
        Welcome Back!
        <v-btn color="white" text @click="loginSuccessSnackbar= false">Close</v-btn>  
    </v-snackbar>
    <v-snackbar
        v-model="loginFailSnackbar"
        color="red"
        :top="true"
        >Bad Username Or Password
        <v-btn color="white" text @click="loginFailSnackbar= false">Close</v-btn>  
    </v-snackbar>
    <v-snackbar color="success" v-model="signUpSuccessSnackbar" :top="true">Welcome To Nomad Pit Stops</v-snackbar>
    </v-app>
</template>

<script>
import Vue from "vue";
import Nav from './partials/nav';
import SignUp from "./../components/dialogs/SignUp.vue";
import Login from "./../components/dialogs/Login.vue";


export default Vue.extend({
    components: {
        Nav,
        SignUp,
        Login
    },
    mounted() {
        this.$fireAuth.onAuthStateChanged(() => {
            this.loggedIn = !!this.$fireAuth.currentUser;
        });
    },
    computed: {
    },
    data: () => ({
        loginDialog:false,
        signUpDialog:false,
        loggedIn:false,
        email:'',
        password:'',
        username:'',
        loginSuccessSnackbar:false,
        loginFailSnackbar:false,
        signUpSuccessSnackbar:false,
        drawer:false,
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            v => (v && v.length >= 8) || 'Password must contain at least 8 charecters'
        ],

        menu: [
            {
                title: 'Home',
                link: '/',
                icon: 'fas fa-home'
            },
            {
                title: 'Blog',
                link: '/blog',
                icon: 'fas fa-book-open'
            },
            {
                title: 'Pit Stops',
                link: '/pitstops',
                icon: 'fas fa-map'
            },
        ],
    }),
    methods: {
        onLogin() {
            this.loginDialog = true;
        },
        async login({email, password}) {
            const loggedIn = await this.$store.dispatch('auth/LOGIN', {
                email,
                password
            });
            if(loggedIn) {
                this.loginSuccessSnackbar = true;
                this.loginDialog = false;
            } else {
                this.loginFailSnackbar = true;
            }
        },
        async onSignUp() {
            this.loginDialog = false;
            this.signUpDialog = true;
        },
        async signup(creds) {
            console.log('creds', creds);
            await this.$store.dispatch('auth/SIGN_UP', creds);
            this.signUpDialog = false;

        },
        onSignout() {
            this.$store.dispatch('auth/LOGOUT');
            this.loggedIn = false;
        },
        checkForEnter(e) {
            if(e.keyCode === 13) this.login();
        },
        onCancel() {
            console.log('cancel')
        }
    }

});
</script>

<style>
</style>
