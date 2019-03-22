<template>
    <div class="__dashboard activities-dashboard">
        <div class="__card __card-deck">
            <h2 class="__card-title">Coding</h2>
            <div class="__card __card-hoverable activity" v-for="i of 3">
                <h2 class="__card-title">Coding in the park</h2>
                <img
                    src="http://www.mattmakai.com/source/static/img/presentations/django-boston-july-2013/chicago-coding-outside.jpg"
                    alt
                >
                <p class="source">Meetup</p>
            </div>
        </div>
        <div class="__card __card-deck">
            <h2 class="__card-title">Cooking</h2>
            <div class="__card __card-hoverable activity" v-for="i of 3">
                <h2 class="__card-title">Cooking in the park</h2>
                <img src="https://i.ytimg.com/vi/2yiH49K7qfw/maxresdefault.jpg" alt>
                <p class="source">Facebook Group</p>
            </div>
        </div>
        <div class="__card __card-deck">
            <h2 class="__card-title">Street Food</h2>
            <div class="__card __card-hoverable activity" v-for="i of 3">
                <h2 class="__card-title">Street Food in the park</h2>
                <img
                    src="https://d2ciprw05cjhos.cloudfront.net/files/v3/styles/gs_large/public/images/19/01/disco_cheetah.jpg?itok=VfdOZOkq"
                    alt
                >
                <p class="source">Airbnb</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'dashboard'
};
</script>

<style>
.activities-dashboard {
    grid-template-rows: 600px;
}
.activities-dashboard .activity img {
    width: 100%;
}
</style>
