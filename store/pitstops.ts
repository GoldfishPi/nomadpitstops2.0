import gql from "graphql-tag";
import  PitstopsList from "./../graphql/pitstops/list.graphql";
import  PitstopQuery from "./../graphql/pitstops/pitstop.graphql";
import  AddPitstop from "./../graphql/pitstops/add.graphql";
import  AddComment from "./../graphql/pitstops/add-comment.graphql";
import  AddImage from "./../graphql/pitstops/add-image.graphql";
interface Store {
    pitstops:Pitstop[];
}

export const state = () => ({
    pitstops:[],
});

export const mutations = {
    SET_PITSTOPS(store:Store, pitstops:Pitstop[]) {
        store.pitstops = pitstops;
    },
};

export const actions:any = {
    async GET_PITSTOPS({commit}, context) {
        const res = await this.app.apolloProvider.defaultClient.query({query:PitstopsList});
        return commit('SET_PITSTOPS', res.data.Pitstops);
    },
    async GET_PITSTOP({commit, state}, id:any) {
        
        const res = await this.app.apolloProvider.defaultClient.query({
            query:PitstopQuery,
            variables: {
                id
            }
        });

        const pitstop = res.data.Pitstop;

        if(!state.pitstops.length) {
            commit('SET_PITSTOPS',[pitstop]);
            return;
        }
        commit('SET_PITSTOPS', state.pitstops
            .map(s => s.id === pitstop.id ? pitstop : s));
    },
    async ADD_PITSTOP(args:any, ps:Pitstop) {
        const { name, notes, connection,longitude , latitude } = ps;
        return await this.app.apolloProvider.defaultClient.mutate({
            mutation:AddPitstop,
            variables: {
                name,
                notes,
                connection,
                longitude,
                latitude
            }
        });
    },

    async ADD_COMMENT({commit, state}, { comment, id}) {

        if(!this.$fireAuth.currentUser)return;

        return  await this.app.apolloProvider.defaultClient.mutate({
            mutation:AddComment,
            variables: {
                id,
                text:comment
            }
        });
    },

    async ADD_IMAGE({commit, state, dispatch}, { file, id}) {

        if(!this.$fireAuth.currentUser)return;
        const res = await this.app.apolloProvider.defaultClient.mutate({
            mutation:AddImage,
            variables: {
                id,
                file 
            },
            context: {
                hasUpload:true
            }
        });
        await dispatch('GET_PITSTOPS');
    },
};

