
import Vue from "vue";
export default Vue.extend({
    props:['value'],
    data(){
        return {
            valid:false,
            emailRules: [
                (v:string) => !!v || 'E-mail is required',
                (v:string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

            passwordRules: [
                (v:string) => (v && v.length >= 8) || 'Password must contain at least 8 charecters'
            ],
            email:'',
            password:'',
            inputVal: this.value
        }
    },
    methods: {
        checkForEnter(e:any) {
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

