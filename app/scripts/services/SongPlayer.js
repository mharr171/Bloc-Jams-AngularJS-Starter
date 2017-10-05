(function() {
  function SongPlayer(Fixtures) {
    /**
     * @desc SongPlayer object to be returned by function to make properties and methods accessible
     * @type {Object}
     */
    var SongPlayer = {};

    /**
     * @desc Stores current album info
     * @type {Object}
     */
    var currentAlbum = Fixtures.getAlbum();

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;

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
     * @function playSong
     * @desc Plays currently playing song
     * @param {Object} song
     */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
     * @function stopSong
     * @desc Stops currently playing song
     */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /**
     * @function getSongIndex
     * @desc returns the index of song
     * @param {Object} song
     */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
     * @desc Active song object from list of songs
     * @type {Object}
     */
    SongPlayer.currentSong = null;

    /**
     * @function SongPlayer.play
     * @desc plays current or new song
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
     * @function SongPlayer.pause
     * @desc pauses current songs
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
     * @function SongPlayer.previous
     * @desc Either goes to the previous song, or stops the song if its the first track
     */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
     * @function SongPlayer.next
     * @desc Either goes to the next song, or stops the song if its the last track
     */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong();
      } else {
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
