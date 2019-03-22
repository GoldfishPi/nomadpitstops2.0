<template>
    <div class="dashboard-hospitality">
        <div class="__card __card-deck">
            <h2 class="__card-title">Available Hospitalities</h2>
            <div class="__card">
                <h2 class="__card-title">Title</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt exercitationem aliquam animi quae corporis error molestias voluptatem provident sunt soluta, cum illum et eaque culpa sapiente qui libero quos odio.</p>
                <div class="images">
                    <img
                        src="https://07f138315bb5e97f9e43-31068357019044cca7c8e84d92de0d99.ssl.cf3.rackcdn.com/1024x768/56587_11491_001.jpg"
                        alt
                    >
                    <img
                        src="https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4105-6/2201-wilson-apartments-building.jpg"
                        alt
                    >
                    <img
                        src="https://static01.nyt.com/images/2018/08/19/realestate/19underground-slide-AYDY/19underground-slide-AYDY-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
                        alt
                    >
                </div>
                <p class="price m">$300/m</p>
                <p class="price d">$10/d</p>
            </div>
        </div>
        <div class="__card __card-deck">
            <h2 class="__card-title">Hospitality Info</h2>
            <div class="__card">
                <h2 class="__card-title">Airbnb</h2>
                <p class="average">Average: $50</p>
                <p class="low">Low: $10</p>
                <p class="high">High: $100</p>
                <div class="__card">Average Rating 3.3 stars</div>
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
.dashboard-hospitality {
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 1.3rem;
    grid-gap: 1.3rem;
}
.dashboard-hospitality .images {
    /* height: 100px; */
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
}
.dashboard-hospitality .images img {
    width: 250px;
    height: 200px;
}
</style>
