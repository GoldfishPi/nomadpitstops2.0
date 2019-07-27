<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex>
                <v-card flat outlined>
                    <v-layout wrap>
                        <v-flex class="hero" md6> 
                            <v-container>
                                <div >
                                    <h1 class="white--text">Welcome To Nomad Pit Stops</h1>
                                </div>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-card flat>
                                <v-card-text>
                                    <v-text-field label="Emain"></v-text-field>
                                    <v-text-field label="Password" type="password"> </v-text-field>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary">Sign Up</v-btn>
                                    <v-btn color="primary">Login</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            label:'',
        }
    }
}
</script>

<style lang="scss">
.hero {
    background-color: #4AA0D5;
}

</style>
