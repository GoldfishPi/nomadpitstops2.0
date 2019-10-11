import LoginDialog from "./index.vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";


describe('Login Dialog', () => {
    let wrap:any;
    beforeEach(() => {
        try {
        const localVue = createLocalVue();
        const vuetify = new Vuetify();

        wrap = mount(LoginDialog, {
            localVue,
            vuetify,
            sync:true,
            propsData: {
                value:true
            }
        });
    
        } catch (e) {
        }

    });

    afterEach(() => {
        wrap.destroy();
    });
    it('emmits sign up event', () => {
        const signUp = wrap.findAll('.v-btn').at(1);
        signUp.trigger('click');

        expect(wrap.emitted().signUp).toBeTruthy();

        wrap.destroy();

    });
    it('works lol', () => {
        //const wrap = mount(LoginDialog, {
        //    localVue,
        //    vuetify,
        //    propsData: {
        //        value:true
        //    }
        //});
        //const inputs = wrap.findAll('.v-input');

        //const nameInput = inputs.at(0).find('input');
        //const passwordInput = inputs.at(1).find('input');

        //const button = wrap.findAll('.v-btn').at(2);

        //nameInput.setValue("erikbadger777@gmail.com");
        //passwordInput.setValue("testpassword123");

        //button.trigger('click');
        //console.log('emmited stuff', wrap.emitted());
        //expect(wrap).toBeTruthy();

        //
        //wrap.vm.$nextTick(() => {
        //    console.log('action button lol', button.html());
        //});

    });
});
