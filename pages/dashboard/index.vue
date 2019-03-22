<template>
    <div class="dashboard">
        <div class="add-new __card __card-borderless __card-hoverable">
            <i class="fa fa-plus plus"></i>
            <p class="title">Create New Dashboard</p>
        </div>
        <nuxt-link
            to="/dashboard/hospitality"
            v-for="i of 4"
            class="tile __card __card-borderless __card-hoverable"
        >
            <img
                src="https://drscdn.500px.org/photo/189972661/m%3D900_s%3D1_k%3D1_a%3D1/v2?webp=true&v=3&sig=d709c0c1e0fa71694a1194428d5866a6b7cf9f549e717fd729f21880fc82eb57"
                alt
            >
            <div class="title">
                <h2>Hanoi</h2>
            </div>
            <div class="eye-mask"></div>
            <i class="eye fa fa-eye"></i>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$store.commit('nav/setNav', false);
        this.$store.commit('nav/setDefault', false);
    }
};
</script>

<style>
.dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 1.3rem;
    grid-gap: 1.3rem;
    grid-auto-rows: 400px;
    justify-items: center;
}
.dashboard .tile {
    width: 400px;
    padding: 0;
    overflow: hidden;
    border-radius: 20px;
    position: relative;
}
.dashboard .tile img {
    height: 100%;
    z-index: -1;
}
.dashboard .tile .title {
    width: 100%;
    height: 50px;
    background-color: #4aa0d5;
    z-index: 2;
    position: absolute;
    bottom: 0px;
    display: grid;
    justify-content: center;
    align-content: center;
}
.dashboard .tile .eye-mask {
    transition: opacity 0.3s;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: white;
    opacity: 0;
    z-index: 2;
}
.dashboard .tile:hover .eye-mask {
    opacity: 0.5;
}
.dashboard .tile .eye {
    transition: opacity 0.3s;
    position: absolute;
    top: 150px;
    left: auto;
    width: 100%;
    text-align: center;
    font-size: 100px;
    color: #666666;
    opacity: 0;
    z-index: 3;
}
.dashboard .tile:hover .eye {
    opacity: 0.5;
}
.dashboard .tile .title h2 {
    color: white;
}
.dashboard .add-new {
    cursor: pointer;
    border: 7px solid #4aa0d5;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 400px;
    padding: 2rem;
}
.dashboard .add-new .plus {
    font-size: 100px;
    font-weight: bold;
    color: #4aa0d5;
}
.dashboard .add-new .title {
    font-size: 1.7rem;
    font-weight: bold;
    color: #4aa0d5;
    text-align: center;
}
@media screen and (max-width: 1300px) {
    .dashboard {
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width: 1300px) {
    .dashboard {
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width: 870px) {
    .dashboard {
        grid-template-columns: 1fr;
    }
}
</style>
