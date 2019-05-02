import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
    const config = {
        apiKey: 'AIzaSyCbsunvjqhzvVJimsptgvg6UR_ysEa9XEo',
        authDomain: 'nomad-pit-stops.firebaseapp.com',
        databaseURL: 'https://nomad-pit-stops.firebaseio.com',
        projectId: 'nomad-pit-stops',
        storageBucket: 'nomad-pit-stops.appspot.com',
        messagingSenderId: '1069723342252'
    }
    firebase.initializeApp(config);
    // firebase.firestore().settings({ timestampsInSnapshots: true });
}
console.log('fireboos', firebase.auth)
const fireDb = firebase.firestore();
const auth = firebase.auth();
// const auth = {};
export { fireDb, firebase, auth }