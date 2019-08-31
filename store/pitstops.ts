import gql from "graphql-tag";
interface Pitstop  {
    id:string;
    name:string;
    connection:number;
    loc: {
        _lat:number;
        _lon:number;
    };
    }
interface Store {
    pitstops:Pitstop[];
    pitstopNotes:Array<{
        pitstopId:string;
        notes:Array<{
            note:string;
            uid:string;
        }>;
    }>;

}

export const state = () => ({
    pitstops:[],
    pitstopNotes:[],
});

export const mutations = {
    SET_PITSTOPS(store:Store, pitstops:Pitstop[]) {
        store.pitstops = pitstops;
    },
    SET_PITSTOP_NOTES(store:Store, notes:any[]) {
        store.pitstopNotes = notes;
    }
};

export const actions:any = {
    async GET_PITSTOPS({commit}, context) {
        const query = gql`
            {
                pitstops {
                    id
                    name
                    notes
                }
            }
        `
        const res = await this.app.apolloProvider.defaultClient.query({query});
        return commit('SET_PITSTOPS', res.data.pitstops);
        //const res = await this.$apollo.query(query);

        //const collection = this.$fireStore.collection('pitstops');
        //const snapshot = await collection.get();
        //const docs = snapshot.docs;
        //return commit('SET_PITSTOPS', docs.map(d => ({...d.data(), id:d.id})));

    },
    async GET_PITSTOP({commit, state}, id) {
        const query = gql`
            {
                pitstop (id:"${id}") {
                    id
                    name
                    notes
                    longitude
                    latitude
                    comments {
                        text
                        user {
                            displayName
                        }
                    }
                }
            }
        `;
        
        const res = await this.app.apolloProvider.defaultClient.query({query});

        const pitstop = res.data.pitstop;

        if(!state.pitstops.length) {
            commit('SET_PITSTOPS',[pitstop]);
            return;
        }
        commit('SET_PITSTOPS', state.pitstops
            .map(s => s.id === pitstop.id ? pitstop : s));
    },
    async GET_PITSTOP_NOTES({commit, state}, pitstopId) {

    },
    async POST_PITSTOP_NOTE({commit, state}, {note, pitstopId}) {
        const userCollection = this.$fireStore.collection('users');
        // const userPitstopCollection = this.$fireStore.doc(this.$fireAuth.getUid()).collection('pitstopNotes');
        const doc = this.$fireStore.collection('pitstops').doc(pitstopId);
        const add = await doc.collection('pitstopNotes').add({
            note,
            uid:this.$fireAuth.getUid()
        });
    },

    async ADD_COMMENT({commit, state}, { comment, id}) {

        if(!this.$fireAuth.currentUser)return;

        const userToken = await this.$fireAuth.currentUser.getIdToken();
        const mutation = gql`
            mutation {
                addPitstopComment(
                    token: "${userToken}",
                    linkedId: "${id}",
                    text: "${comment}"
                ) {
                    text
                }
            }
        `;
        const res = await this.app.apolloProvider.defaultClient.mutate({mutation});
    }
};

export const getters:any = {
    NOTES(state:Store) {
        return state.pitstopNotes;
    }
}
