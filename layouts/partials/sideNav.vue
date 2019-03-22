<template>
    <div class="side-nav">
        <!-- <h1 class="heading">Dashboard</h1> -->
        <ul>
            <li v-bind:class="$route.name === 'dashboard-hospitality' ? 'sel': ''">
                <nuxt-link to="/dashboard/hospitality" class="link">
                    <i class="fa fa-home"></i>
                    <p>Hospitality</p>
                </nuxt-link>
            </li>
            <li v-bind:class="$route.name === 'dashboard-medical' ? 'sel': ''">
                <nuxt-link to="/dashboard/medical" class="link">
                    <i class="fa fa-pills"></i>
                    <p>Medical</p>
                </nuxt-link>
            </li>
            <li v-bind:class="$route.name === 'dashboard-activities' ? 'sel': ''">
                <nuxt-link to="/dashboard/activities" class="link">
                    <i class="fa fa-cocktail"></i>
                    <p>Experiences</p>
                </nuxt-link>
            </li>
            <li v-bind:class="$route.name === 'dashboard-coworking' ? 'sel': ''">
                <nuxt-link to="/dashboard/coworking" class="link">
                    <i class="fa fa-laptop"></i>
                    <p>Workspaces</p>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/dashboard/lol" class="link">
                    <i class="fa fa-plane-departure"></i>
                    <p>Notifly</p>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/dashboard/lol" class="link">
                    <i class="fa fa-book-open"></i>
                    <p>Research</p>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log('route', this.$route);
    }
};
</script>

<style>
.side-nav {
    background-color: #454553;
    height: 89.4vh;
}
.side-nav .heading {
    color: white;
    margin: 1rem 0;
}
.side-nav ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-top: 1rem;
}
.side-nav ul li {
    transition: all 0.3s;
    cursor: pointer;
    background-color: #4aa0d5;
    margin-left: 0;
}
.side-nav ul li.sel,
.side-nav ul li:hover {
    background-color: #454553;
}
.side-nav ul li.sel {
    border-right: 5px solid #4aa0d5;
}
.side-nav .link {
    color: initial;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    color: white;
    flex-direction: row-reverse;
    padding: 1rem 3rem;
}
.side-nav .link p {
    text-align: left;
    /* right: 3rem; */
    /* position: absolute; */
}
</style>
