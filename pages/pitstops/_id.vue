<template>
    <v-container fluid>
        <!-- <h1>Pitstop Name</h1> -->
        <v-card flat outlined>
            <v-layout justify-space-between wrap>
                <v-flex xs12 md7>
                    <Map/>
                </v-flex>
                <v-flex xs12 md5>
                    <v-card flat class="hidden-sm-and-down">
                        <v-card-title>Pitstop Name</v-card-title>
                    </v-card>
                    <v-card flat>
                        <v-card-text>
                            <v-textarea outlined label="Field Notes"></v-textarea>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text>Add</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-list three-line>
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-img
                                    src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>Username</v-list-item-title>
                                <v-list-item-subtitle>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, voluptatem accusamus ea accusantium consectetur nihil? Soluta, numquam alias? Temporibus repudiandae numquam sequi facere veritatis pariatur quo minus ut? Fugiat, voluptatum!</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
import Map from '~/components/Map';
export default {
    components: {
        Map
    }
};
</script>

<style scoped>
.map {
    height: 75vh;
}
.map-wrap {
    /* margin-bottom: 0.5rem; */
    /* margin-right: 0.5rem; */
}
</style>
