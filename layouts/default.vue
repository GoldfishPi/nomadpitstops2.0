<template>
    <v-app>
        <Nav :menu="menu" :loggedIn="loggedIn" @login="onLogin()" @signout="onSignout()">
            <Hammock class="logo"/>
        </Nav>
        <v-content>
            <nuxt/>
        </v-content>
        <v-dialog width="400" v-model="loginDialog">
            <v-card>
                <v-card-title>Login</v-card-title>
                <v-card-text>
                    <v-text-field label="Username" v-model="email"></v-text-field>
                    <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="loginDialog=false">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="onSignUp()">SIGN UP</v-btn>
                    <v-btn text color="primary" @click="login()">LOGIN</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog width="500" v-model="signUpDialog">
            <v-card>
                <v-card-title>Sign Up</v-card-title>
                <v-card-text>
                    <v-text-field label="Email" v-model="email"></v-text-field>
                    <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn text v-on:click="signUpDialog=false">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="signUp()">Sign Up</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
            v-model="loginSuccessSnackbar"
            color="success"
            :top="true"
            :left="true"
        >Logged in!
        <v-btn color="white" text @click="loginSuccessSnackbar= false">Close</v-btn>  
        </v-snackbar>
        <v-snackbar
            v-model="loginFailSnackbar"
            color="red"
            :top="true"
            :left="true"
        >Bad Username Or Password
        <v-btn color="white" text @click="loginFailSnackbar= false">Close</v-btn>  
        </v-snackbar>
        <v-snackbar color="success" v-model="signUpSuccessSnackbar" :top="true">Welcome To Nomad Pit Stops</v-snackbar>
    </v-app>
</template>
<script>
import Nav from './partials/nav';
import Hammock from '~/static/hammock.svg?inline';

export default {
    components: {
        Nav,
        Hammock
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
        loginSuccessSnackbar:false,
        loginFailSnackbar:false,
        signUpSuccessSnackbar:false,
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
                title: 'Pitstops',
                link: '/pitstops',
                icon: 'fas fa-map'
            },
        ],
    }),
    methods: {
        onLogin() {
            this.loginDialog = true;
            console.log('lol')
        },
        async login() {
            try {
                const login = await this.$fireAuth.signInWithEmailAndPassword(this.email, this.password);
                this.loginSuccessSnackbar = true;
                this.loginDialog = false;
            } catch (e) {
                this.loginFailSnackbar = true;
            }
        },
        async signUp() {
            try {
                console.log('sign up', this.email, this.password);
                const signUp = await this.$fireAuth.createUserWithEmailAndPassword(this.email, this.password);       
                const login = await this.$fireAuth.signInWithEmailAndPassword(this.email, this.password);
                this.signUpDialog = false;
                this.signUpSuccessSnackbar = true;
            } catch (e) {
                console.log('nope');
            }
        },
        onSignUp() {
            this.loginDialog = false;
            this.signUpDialog = true;
        },
        onSignout() {
            this.$fireAuth.signOut();
            this.loggedIn = false;
        }
    }

};
</script>

<style>
.logo {
    border-radius: 0;
    height: 100%;
    margin-right: 1rem;
    /* border-radius: 100%; */
    fill: #4aa0d5;
}

/* ._content {
padding-top: 5rem;
} */
</style>
