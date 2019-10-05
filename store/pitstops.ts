import gql from "graphql-tag";
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
        const query = gql`
            {
                Pitstops {
                    id
                    name
                    notes
                    images {
                        link
                    }
                }
            }
        `;
        const res = await this.app.apolloProvider.defaultClient.query({query});
        return commit('SET_PITSTOPS', res.data.Pitstops);
        //const res = await this.$apollo.query(query);

        //const collection = this.$fireStore.collection('pitstops');
        //const snapshot = await collection.get();
        //const docs = snapshot.docs;
        //return commit('SET_PITSTOPS', docs.map(d => ({...d.data(), id:d.id})));

    },
    async GET_PITSTOP({commit, state}, id) {
        const query = gql`
            {
                Pitstop (id:"${id}") {
                    id
                    name
                    notes
                    longitude
                    latitude
                    connection
                    images {
                        link
                    }
                    comments {
                        text
                        user {
                            username
                        }
                    }
                }
            }
        `;
        
        const res = await this.app.apolloProvider.defaultClient.query({query});

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
        const mutation = gql`
            mutation($name:String!, $notes:String!, $connection:Int!, $longitude:Float!, $latitude:Float!) {
              addPitstop(
                name: $name,
                notes:$notes,
                connection:$connection,
                longitude:$longitude,
                latitude:$latitude
              ) {
                id
              }
            }
        `;
        const res = await this.app.apolloProvider.defaultClient.mutate({
            mutation,
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
    },

    async ADD_IMAGE({commit, state, dispatch}, { file, id}) {

        if(!this.$fireAuth.currentUser)return;

        const userToken = await this.$fireAuth.currentUser.getIdToken();
        const mutation = gql`
            mutation($file: Upload!) {
                addPitstopImage(
                    id: "${id}",
                    image: $file
                ) {
                    id
                }
            }
        `;
        const res = await this.app.apolloProvider.defaultClient.mutate({
            mutation,
            variables: {
                file 
            },
            context: {
                hasUpload:true
            }
        });
        await dispatch('GET_PITSTOPS');
    },
};

