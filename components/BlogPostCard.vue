<template functional>
    <v-card flat outlined class="blog-post-card" :title="props.post.title" :to="`/blog/${props.post.uid}`">
        <v-img v-bind:src="props.post.lead" aspect-ratio="1.75"></v-img>
        <v-card-title>
            <div>
                <h3 class="title">{{props.post.title}}</h3>
            </div>
        </v-card-title>
        <v-card-text>
            <div class="grey--text body-1"><span v-if="props.post.type">{{props.post.type}} -</span> {{props.post.date}}</div>
            <div class="body-2">{{props.post.snippet}}</div>
        </v-card-text>
        <v-card-actions>
            <v-btn text color="blue" :title="props.post.title" :to="`/blog/${props.post.uid}`">More</v-btn>
        </v-card-actions>
    </v-card>
    <!-- <div></div> -->
</template>
<style>
.blog-post-card {
    cursor: pointer;
}
</style>
