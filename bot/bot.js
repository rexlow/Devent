var _ = require('lodash-node');
var firebase = require('firebase');
firebase.initializeApp({
 "appname": "Devent",
 "serviceAccount": "./service-account.json",
 "authDomain": "devent-7da1c.firebaseapp.com",
 "databaseURL": "https://devent-7da1c.firebaseio.com",
 "storageBucket": "devent-7da1c.appspot.com"
});

var database = firebase.app().database().ref();
var trendingRef = database.child('Trending');

function logTrendingData() {
  trendingRef.once('value')
    .then((snap) => {
      updateData(snap.val())
    })
}

function updateData(Trending) {
  for (var key in Trending) {
    if (Trending.hasOwnProperty(key)) {
      if (Trending[key].title === 'IoT') {
        Trending[key].value = Trending[key].value*1.05
      }
      if (Trending[key].title === 'React JS') {
        Trending[key].value = Trending[key].value*1.05
      }
      if (Trending[key].title === 'Machine Learning') {
        Trending[key].value = Trending[key].value*1.2
      }
      database.update({ Trending })
    }
  }

}

setInterval(logTrendingData, 1500);
