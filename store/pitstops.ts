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
    async GET_PITSTOPS({commit}) {
        const collection = this.$fireStore.collection('pitstops');
        const snapshot = await collection.get();
        const docs = snapshot.docs;
        return commit('SET_PITSTOPS', docs.map(d => ({...d.data(), id:d.id})));

    },
    async GET_PITSTOP({commit, state}, id) {
        const pitstopCollection = this.$fireStore.collection('pitstops');
        const docRef = pitstopCollection.doc(id);
        const doc = await docRef.get();
        const data = {...doc.data(), id};
        commit('SET_PITSTOPS', state.pitstops.map(s => s.id === data.id ? {...s} : data));

    },
    async GET_PITSTOP_NOTES({commit, state}, pitstopId) {
        const collection = this.$fireStore.collection('pitstops').doc(pitstopId).collection('pitstopNotes');
        const data = await collection.get();
        const notes = data.docs.map(d => d.data()); 

        const userCollection = this.$fireStore.collection('users');
        const noteUserPromises = notes.map(n => userCollection.doc(n.uid).get());
        const userCredDocs:any = await Promise.all(noteUserPromises);

        const compoundNotes = notes.map((n, i) => ({...n, ...userCredDocs[i].data()}));

        if(state.pitstopNotes.find(n => n.pitstopId === pitstopId)) {
            const pitstopNotes = state.pitstopNotes.map(n => n.pitstopId === pitstopId ? {pitstopId, notes:compoundNotes} : n);
            commit('SET_PITSTOP_NOTES', pitstopNotes);
        } else {
            commit('SET_PITSTOP_NOTES', [...state.pitstopNotes, {pitstopId, notes:compoundNotes}]);
        }

    },
    async POST_PITSTOP_NOTE({commit, state}, {note, pitstopId}) {
        const userCollection = this.$fireStore.collection('users');
        // const userPitstopCollection = this.$fireStore.doc(this.$fireAuth.getUid()).collection('pitstopNotes');
        const doc = this.$fireStore.collection('pitstops').doc(pitstopId);
        const add = await doc.collection('pitstopNotes').add({
            note,
            uid:this.$fireAuth.getUid()
        });
    }
};

export const getters:any = {
    NOTES(state:Store) {
        return state.pitstopNotes;
    }
}
