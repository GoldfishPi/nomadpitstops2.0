<template>
    <div class="medical-dashboard __dashboard">
        <div class="__card">
            <h2 class="__card-title">Vaccine Report</h2>
            <h3>Required</h3>
            <ul>
                <li>Yellow Fever</li>
                <li>Miliaria</li>
                <li>Hep C</li>
            </ul>
            <h3>Recomended</h3>
            <ul>
                <li>Flu</li>
                <li>Tetanus</li>
            </ul>
            <h3>Urban</h3>
            <ul>
                <li>Yellow Fever</li>
                <li>Miliaria</li>
                <li>Hep C</li>
            </ul>
            <h3>Rural</h3>
            <ul>
                <li>Flu</li>
                <li>Tetanus</li>
            </ul>
        </div>
        <div class="__card">
            <h2 class="__card-title">Enviroment</h2>
            <h3>Water Quality</h3>
            <h3>Air Quality</h3>
        </div>
        <div class="__card flu-map">
            <h2 class="__card-title">Flu Map</h2>
            <GmapMap
                :center="focus"
                :zoom="10"
                map-type-id="terrain"
                style="height: 400px; width:100%;"
            ></GmapMap>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    data() {
        return {
            focus: {
                lng: 0,
                lat: 0
            }
        };
    }
};
</script>

<style>
.medical-dashboard {
    grid-template-columns: 1fr 1fr;
}
.medical-dashboard .flu-map {
    grid-column-start: 1;
    grid-column-end: 3;
    height: 500px;
}
</style>
