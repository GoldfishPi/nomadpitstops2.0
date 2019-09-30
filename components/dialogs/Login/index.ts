
import Vue from "vue";
export default Vue.extend({
    props:['value'],
    data(){
        return {
            valid:false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

            passwordRules: [
                v => (v && v.length >= 8) || 'Password must contain at least 8 charecters'
            ],
            email:'',
            password:'',
            inputVal: this.value
        }
    },
    methods: {
        checkForEnter(e) {
            if(e.keyCode != 13)return;
            console.log('is enter');
            if(this.valid)this.done();
        },
        done() {
            this.$emit('done', {
                email:this.email,
                password:this.password
            });
        }
    },
    watch: {
        value(val) {
            this.inputVal = val;
        },
        inputVal(val) {
            this.$emit('input', val);
        }
    }
});

