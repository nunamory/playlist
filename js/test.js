$('.playBtn').on('click', function (event) {
    var num = $(event.currentTarget).closest('.playlist').attr('id');
    displayPlayer(playlist[num]);
});

//fills songs in modal
function addSongToPlaylist(data) {
    $('#songsTab').html("");
    for (var i = 0; i < data.songs.length; i++) {
        $('#addModalTitle').text('Edit playlist');
        $('#songsTab').append(`
            <form class="song">
                <label>Name: <input name="name" class="newSongName" value="` + data.songs[i].name + `"></input></label>
                <label>Url: <input name="url" class="newSongUrl" value="` + data.songs[i].url + `"></input></label><br>
            </form>`);
        $('#submitPlaylist').hide();
        $('#saveEdits').show();
    };
};
///
function createPlaylist() {
    var service = new playlistService();
    var songs = [];
    $('.newSongs').each(function () {
        var a = $(this).serializeArray();
        var returnObj = {};
        for (var i = 0; i < a.length; i++) {
            returnObj[a[i]['name']] = a[i]['value'];
        }
        if (returnObj.name !== '' && returnObj.url !== '') songs.push(returnObj);
    });
    

    service.addPlaylist(playlist, getList);
    $('#playerCover').hide();
}
///


function addTitleToPlayer(playlist) {
    $playlistId = playlists.data.indexOf(playlist);
    $playlistName = playlist.name;
    $('#trackName').append(`
        <div class="title">` + $playlistName + `</div>`);
}
///

function playPause(list) {
    
        //autoplay
        audio.play();
        $('#playingImg').addClass('imgOnPlay');
    
        //prep for changing tracks
        var listArray = Object.values(list);
        var playIndex = 0;
    
        $(document).prop('title', listArray[playIndex]['name']);
        $('#nowPlaying').html('NOW PLAYING: ' + listArray[0]['name']);
    
        //change to button
        $('#playingImg').on('click', function () {
    
            if (audio.paused) {
                audio.play();
                $('#playingImg').addClass('imgOnPlay');
            } else {
                audio.pause();
                $('#playingImg').removeClass('imgOnPlay');
            }
        });
    
        //make playlist browsable
        $('.playlistItem').on('click', function () {
            var playNow = '';
            var titleNow = '';
            for (var song of listArray) {
                if (song.name == this.innerText) {
                    playNow = song.url;
                    titleNow = song.name;
                }
            }
            $('#playingImg').addClass('imgOnPlay');
            $('#nowPlaying').html('NOW PLAYING: ' + titleNow)
            audio.setAttribute("src", playNow);
            $(document).prop('title', titleNow);
            audio.play();
        });
    
        //autoplay next
        audio.onended = function () {
            if (playIndex < listArray.length - 1) {
                playIndex++;
            } else playIndex = 0;
            audio.setAttribute("src", listArray[playIndex]['url']);
            $(document).prop('title', listArray[playIndex]['name']);
            audio.play();
        }
    
        //make sure the spinning image is in sync 
        audio.onplay = function () {
            $('#playingImg').addClass('imgOnPlay');
        }
    
        audio.onpause = function () {
            $('#playingImg').removeClass('imgOnPlay');
        }
    }
///

function getData(id) {
    var service = new playlistService();
    service.getPlaylistById(id, editPlaylist);
    service.getPlaylistSongsById(id, addSongToPlaylist);

    //fills first page of modal 
    function editPlaylist(data) {
        $('#newPlaylistId').val(id);
        $('#newPlaylistName').val(data.name);
        $('#newPlaylistImage').val(data.image);
        $('#imgPreview').css({
            'background': 'url(' + data.image + ')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center center'
        })
    }

}

///
<div id="btnStyle">
<i class="fa fa-times btns" aria-hidden="true"></i>
<i class="fa fa-pencil-square-o btns" aria-hidden="true"></i>
</div>

/// calling player

function displayPlayer(playlist) {
	
		var id = playlist.id;
	
		var sources = JSON.parse(playlist.songs);
	
		$('#playerCover').html(`
		<div id="playingImg" class="playlistImage">
			<div class="playlist"><i class="fa fa-pause"></i></div>
		</div>
		<div class="currentPlayer">
		<div class="title">` + $playlistName + `</div>
			<div><audio id="audio" controls><source src="` + sources[0]['url'] + `" type="audio/mpeg"></audio></div>
			<div id="currentPlaylist"></div>
		</div>
		<div id="playingButtons">
			<i class="fa fa-pencil" id="editBtn"></i><br>
			<i class="fa fa-trash" id="deleteBtn"></i>
		</div>
		<div>
			<i class="fa fa-times" id="exitBtn"></i>
		</div>`);
	
		$('#editBtn').on('click', function () {
			getData(id);
		});
	
	
		$('#deleteBtn').on('click', function () {
	
		});
	
	
		$('#exitBtn').on('click', function () {
			$('#playeCover').hide();
		});
	
	}
});