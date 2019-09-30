import Map from "./../../helpers/Map/index.vue"
import Vue from "vue";
import { getNavigatorCoords } from "geo-loc-utils";

export default Vue.extend({
    props:['active'],
    components: {
        Map
    },
    async mounted() {
        try {
            const coords = await getNavigatorCoords();
            this.cLng = coords.longitude;
            this.cLat = coords.latitude;

            this.wLng = coords.longitude;
            this.wLat = coords.latitude;
        } catch(err) {}
    },
    data:() => ({
        dialog:false,
        el:0,

        cLng:0,
        cLat:0,

        wLng:0,
        wLat:0,

        title:'',
        wifi:0,
        description:'',
        images:[],

    }),
    methods: {
        moveCursor({latLng}) {
            this.cLng = latLng.lng();
            this.cLat = latLng.lat();
        },
        async useLocation() {
            try {
                const coords = await getNavigatorCoords();
                this.wLng = coords.longitude;
                this.wLat = coords.latitude;

                this.cLng = coords.longitude;
                this.cLat = coords.latitude;
            } catch(err) {}
        },
        create() {
            this.$emit('create', {
                lng:this.cLng,
                lat:this.cLat,
                title:this.title,
                description: this.description,
                images: this.images,
            });
            this.$emit('close');
        }
    }
});

