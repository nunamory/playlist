$(document).ready(function () {

    $('#addPlaylist').on('click', function () {
        $('#addPlaylistModal').show(1000).css({
            'display': 'flex'
        });
    });

    $('#addSongBtn').on('click', function () {
        $('#songsTab').append(
            `<form class="song">
            <label>Name: <br><input name="name" class="newSongName"><br></label>
            <label>Url:  <br><input name="url" class="newSongUrl" placeholder="mp3 only"><br></label>
        </form>`
        );
    });

    $('body').on('click', '#reset', function () {
        resetFields();
    });

    // delete playlist

    $('body').on('click', '.delete', function () {
        var playlistId = $(this).closest('#delete_playlist').attr('data-id');
        var URL = "api/playlist/" + playlistId;
        $.ajax({
            url: "api/playlist/" + playlistId,
            type: 'DELETE'
        });
    });

    function validation() {
        var songInfo;
        var invalidCount = 0;
        var urls = $('.newSongUrl');
        var regex = new RegExp('^[-a-zA-Z0-9@:%_\+.~#?&//=]+\.(mp3|MP3)$');
        urls.each(function() {
            if ($(this).val() !== '') {
              if (!regex.test($(this).val())) {
                invalidCount++;
                $(this).addClass('invalid');
              }
            }
          });
        
          if (invalidCount == 0) {
            return true;
          }
        }
        

    //create playlist button
    $('#submitPlaylist').on('click', function () {
        createPlaylist();
    });

    $('#savePlaylist').on('click', function() {
        if (validation()) {
            $('#error').html('');
            createPlaylist();
        } else {
            $('#error').html('Songs must be links to mp3!');
        }
    });

    //clear on close
    $('#closeModalBtn').on('click', function () {
        resetFields();
    });

    //when adding make edit button invisible
    $('#addBtnMain').on('click', function () {
        $('#saveEdits').hide();
    });

    //search button
    $('#search').on('click', function () {
        var service = new playlistService();
        service.getPlaylists(findPlaylist);
    });



});