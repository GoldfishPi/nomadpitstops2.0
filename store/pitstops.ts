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
        console.log('query', query);
        const res = await this.app.apolloProvider.defaultClient.query({query});
        console.log('res lol', res);
        return commit('SET_PITSTOPS', res.data.pitstops);
        //const res = await this.$apollo.query(query);
        //console.log('gql lol', res);

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

        console.log('res lol', pitstop);
        if(!state.pitstops.length) {
            console.log('defaulting lol');
            commit('SET_PITSTOPS',[pitstop]);
            console.log('state lol', state);
            return;
        }
        commit('SET_PITSTOPS', state.pitstops
            .map(s => s.id === pitstop.id ? pitstop : s));
        console.log('state', state);

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
        console.log('id lol', id);
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
        console.log('user', res);
    }
};

export const getters:any = {
    NOTES(state:Store) {
        return state.pitstopNotes;
    }
}
