(function() {
    function SongPlayer(Fixtures) {
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
         * @desc Currently Playing Song
         * @type {Object}
         */
        SongPlayer.currentSong = null;


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

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
