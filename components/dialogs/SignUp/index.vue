<template>
    <v-dialog 
        @keydown="checkForEnter($event)"
        width="500" 
        v-model="inputVal">
        <v-card>
            <v-card-title>Sign Up</v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-layout>
                        <v-flex xs5>
                            <v-text-field 
                                label="First Name" 
                                v-model="firstName"
                                ></v-text-field>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs6>
                            <v-text-field 
                                label="Last Name" 
                                v-model="lastName"
                                ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-text-field label="Username" v-model="username"></v-text-field>
                    <v-text-field 
                        :rules="emailRules" 
                        label="Email" 
                        v-model="email"
                    ></v-text-field>
                    <v-text-field 
                        :rules="passwordRules" 
                        label="Password" 
                        type="password" 
                        v-model="password"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    @click="$emit('cancel')" 
                    text
                >Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn 
                    :disabled="!valid"
                    color="primary" 
                    text 
                    @click="done()"
                    >Sign Up</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script lang="ts" src="./index.ts"></script>
