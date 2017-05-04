(function() {
    function Fixtures() {
        var Fixtures = {};

        var roughCutLove = {
            title: 'Rough Cut Love',
            artist: 'Joe Griffin',
            label: 'Stupid Itchy Church Socks Music',
            year: '2004',
            albumArtUrl: '/assets/images/RoughCutLove_coverArt.jpg',
            songs: [
                { title: 'Clearly Better', duration: '175.81', audioUrl: '/assets/music/01 Clearly Better' , stars : 4 , numberOfRatings : 1, skip : false},
                { title: 'Feedback', duration: '294.61', audioUrl: '/assets/music/02 Feedback' , stars : 4 , numberOfRatings : 1, skip : false},
                { title: 'On Your Own', duration: '157.68', audioUrl: '/assets/music/03 On Your Own' , stars : 4 , numberOfRatings : 1, skip : false},
                { title: 'Cold Hands Warm Heart', duration: '219.66', audioUrl: '/assets/music/04 Cold Hands Warm Heart' , stars : 4 , numberOfRatings : 1, skip : false},
                { title: 'Never Leave You', duration: '202.63', audioUrl: '/assets/music/05 Never Leave You' , stars : 4 , numberOfRatings : 1, skip : false},
                { title: 'You Again', duration: '209.66', audioUrl: '/assets/music/06 You Again' , stars : 4 , numberOfRatings : 1, skip : false},
                { title: 'Never The Dawn', duration: '217.44', audioUrl: '/assets/music/07 Never The Dawn' , stars : 4 , numberOfRatings : 1, skip : false},
                { title: 'If You Ever....', duration: '309.73', audioUrl: '/assets/music/08 If You Ever...' , stars : 4 , numberOfRatings : 1, skip : false},
                { title: 'Year of the Car Crash', duration: '356.10', audioUrl: '/assets/music/09 Year of the Car Crash' , stars : 4 , numberOfRatings : 1, skip : false},
                { title: 'Left Turn At Albuquerque', duration: '258.56', audioUrl: '/assets/music/10 Left Turn At Albuquerque' , stars : 4 , numberOfRatings : 1, skip : false},
            ]
        };

        Fixtures.getAlbum = function() {
            return roughCutLove;
        };

        Fixtures.getCollection = function(numberOfAlbums){
          var albumCollection = [];

          for(var i =0; i < numberOfAlbums; i++){
              albumCollection.push(roughCutLove);
          }

          return albumCollection;
        };

        return Fixtures;
    }

    angular
        .module('blocJams')
        .factory('Fixtures', Fixtures);
})();
