function playlistService() {
    
        this.getAllPlaylists = function (callback) {
            $.ajax({
                type: "Get",
                url: "./api/playlist",
                contentType: "application/json",
                success: function (result, status, xhr) {
                    callback(result);
                }
            });
        };
    
        this.getPlaylistById = function (id, callback) {
            $.ajax({
                type: "Get",
                url: "api/playlist/{id}:" + id,
                success: function (result, status, xhr) {
                    getById(result);
                }
            });
        };
    
        this.addPlaylist = function (playlist, callback) {
            $.ajax({
                type: "Post",
                url: "./api/playlists",
                data: playlist,
                success: function (result, status, xhr) {
                    callback();
                }
            });
        }
    
        this.updatePlaylist = function (playlist, callback) {
            $.ajax({
                type: "Put",
                url: "playlist/{id}:" + playlist.id,
                contentType: "application/json",
                data: JSON.stringify(playlist),
                processData: false,
                success: function (result, status, xhr) {
                    callback();
                }
            });
        }
    }
    
    