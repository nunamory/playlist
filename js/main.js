function getList() {
    var service = new playlistService();
    service.getAllPlaylists(showAllPlaylists);
}

function showAllPlaylists(playlists) {
    $('#all-playlists').html('');
    for (var i = 0; i < playlists.data.length; i++) {
        $playlistId = playlists.data[i].id;
        $playlistName = playlists.data[i].name;
        $playlistImage = playlists.data[i].image;
        $('#all-playlists').append(`
        <div class="playlist" id="` + $playlistId + `">
        <div class="title">` + $playlistName + `</div>        
              <i id="playBtn" class="btns fa fa-play-circle"></i>
        </div>`);
        $('#' + $playlistId).css({
            'background': 'url(' + $playlistImage + ')',
            'background-size': 'cover',
            'background-position': 'center center'
        });
    }

    ///need help with this buttons!!!!

    // $('#all-playlists').append(`
    //   <div id="btnStyle">
    //      <i class="fa fa-times btns" aria-hidden="true"></i>
    //      <i class="fa fa-pencil-square-o btns" aria-hidden="true"></i>
    //   </div>`);

    $('.title').arctext({
        radius: 150
    });

    //function to call the player//

    $('#playBtn').on('click', function () {
        $('#playerCover').slideDown('1000').css({
            'display': 'flex'
        })
    });
};


function resetFields() {
    $('#imgName').val('');
    $('#imgURL').val('');
    $('#imageHolder').attr('src', '');
}

$('#addPlaylist').on('click', function () {
    $('#addPlaylistModal').show(1000).css({
        'display': 'flex'
    });
});

//Preview image
$('body').on('change', '#imgURL', function () {
    $('#imageHolder').attr('src', this.value);
});

function nextStep() {
    $('#new_playlist').on('click', function () {
        $('#addSong').show(1000);
          $('#addPlaylistModal').hide(10);
    });
}

function createPlaylist() {
    var service = new playlistService();
    var songs = [];
    $('.newSong').each(function(){
        var a = $(this).serializeArray();
        var returnObj = {};
        for (var i = 0; i < a.length; i++){
            returnObj[a[i]['name']] = a[i]['value'];
        }
        if (returnObj.name !== '' && returnObj.url !== '') songs.push(returnObj);
    });

    var playlist = {
        'name': $('#newPlaylistName').val(),
        'image': $('#newPlaylistImage').val(),
        'songs': songs
    }

    //cleanup modal close
    resetFields();    
    $('#addModal').toggle();
    $('.modal-backdrop').remove();

    service.addPlaylist(playlist, getList);
    $('#playerCover').hide();
}