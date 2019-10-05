
import Vue from "vue";
export default Vue.extend({
    props: [
        'value'
    ],
    data() {
        return {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            emailRules: [
                (v:string) => !!v || 'E-mail is required',
                (v:string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                (v:string) => (v && v.length >= 8) || 'Password must contain at least 8 charecters'
            ],
            valid:false,

            inputVal:this.value
        }

    },
    methods: {
        done() {
            this.$emit('done', {
                firstName:this.firstName,
                lastName: this.lastName,
                username: this.username,
                password: this.password,
                email: this.email,
            });
        },
        checkForEnter(e:any) {
            if(e.keyCode != 13)return;
            if(this.valid)this.done();
        },
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

