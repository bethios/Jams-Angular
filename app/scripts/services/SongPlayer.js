(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        /**
         * @desc holds album currently on the page
         * @type {Object}
         */
        var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function playSong
         * @desc Sets song.playing to true and plays currentBuzzObject
         * @param {Object} song
         */
        var playSong = function(song){
            if(song.skip === true){
                SongPlayer.next();
                return;
            }

            currentBuzzObject.play();
            song.playing = true;
        };

        /**
         * @function stopSong
         * @desc stops current song and sets song.playing to null
         */
        var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null
        };

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();

                });
            });

            currentBuzzObject.bind('ended', function(event) {
                SongPlayer.next();
            });


            SongPlayer.rated = null;
            SongPlayer.currentSong = song;
        };

        /**
         * @function getSongIndex
         * @desc retrieves index of song
         * @param {Object} song
         * @returns {number}
         */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
         * @desc volume level
         * @type {number}
         */
        SongPlayer.volume = 50;

        /**
         * @desc Currently Playing Song
         * @type {Object}
         */
        SongPlayer.currentSong = null;

        SongPlayer.rated = null;

        /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;

        /**
         * @function SongPlayer.play
         * @desc Evaluates status of SongPlayer.currentSong
         * @param {Object} song
         */
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;

            if(SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song){
              if(currentBuzzObject.isPaused()){
                  currentBuzzObject.play();
              }
            }
        };


        /**
         * @function SongPlayer.pause
         * @desc pauses current song and sets song.playing to false
         * @param {Object} song
         */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
         * @function SongPlayer.previous
         * @desc moves current song to previous track
         */
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if(currentSongIndex < 0){
                stopSong();
            }else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
         * @function SongPlayer.next
         * @desc moves current song to next track
         */
        SongPlayer.next = function(){
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if(currentSongIndex > currentAlbum.songs.length){
              stopSong();
          }else{
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

        /**
         * @function SongPlayer.setCurrentTime
         * @desc sets the seek bars time to show progress
         * @param {number} time
         */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };


        /**
         * @function SongPlayer.muteAll
         * @desc toggles mute on and off
         */
        SongPlayer.muteAll = function(){
            if(currentBuzzObject){
                currentBuzzObject.toggleMute();
            }
        };

        /**
         * @function SongPlayer.newRating
         * @desc calculates and reflects new rating info
         */

        SongPlayer.newRating = function() {
            if (SongPlayer.currentSong) {
                var numberOfTotalStars = SongPlayer.currentSong.stars || 0;
                var numberOfRatings = SongPlayer.currentSong.numberOfRatings;
                var currentStars = (numberOfTotalStars / numberOfRatings).toFixed(1);

                return currentStars;
                /*var showStars = "";

                 for(var i =1; i<=currentStars; i++){
                 showStars += "<span class='ion-ios-star' ng-style='{color : yellow}'></span>"
                 }
                 return showStars;
                 */
            }
        };


        SongPlayer.rateSong = function(starRating){
            SongPlayer.currentSong.numberOfRatings++;
            SongPlayer.currentSong.stars += starRating;

            SongPlayer.rated = true;
        };


        /**
         * @function SongPlayer.setVolume
         * @desc sets volume
         * @param {number} newVolume
         */
        SongPlayer.setVolume = function(newVolume){
            if(currentBuzzObject){
                currentBuzzObject.setVolume(newVolume);
            }
            SongPlayer.volume = newVolume
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
