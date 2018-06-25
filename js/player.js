$(function () {
	var audio, playPause = $('#playPause'),sArea = $('#sArea'),seekBar = $('#seekBar'),
	tProgress = $('#aPlayed'),tTime = $('#aTotal'), sHover = $('#sHover'),
	seekT, seekLoc, insTime = $('#insTime');

	function play_pause() {
		if (audio.paused) {
			audio.play();
			$('#playPause i').attr('class', 'fa fa-pause');
		} else {
			audio.pause();
			$('#playPause i').attr('class', 'fa fa-play');
		}
	}

	function showHover(event) {
		var seekBarPos = seekBar.offset();
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());

		sHover.width(seekT);

		var cM = seekLoc / 60;

		var ctMinutes = Math.floor(cM);
		var ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

		if ((ctMinutes < 0) || (ctSeconds < 0))
			return;

		if (ctMinutes < 10)
			ctMinutes = '0' + ctMinutes;

		if (ctSeconds < 10)
			ctSeconds = '0' + ctSeconds;

		insTime.text(ctMinutes + ':' + ctSeconds).css({
			'left': seekT,
			'margin-left': '-25px'
		}).fadeIn(0);
	}

	function hideHover() {
		sHover.width(0);
		insTime.text('00:00').css({
			'left': '0px',
			'margin-left': '0px'
		}).fadeOut(0);
	}

	sArea.on('click', function () {
		audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
	})

	function updateCurrTime() {
		var curMinutes = Math.floor(audio.currentTime / 60);
		var curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

		var durMinutes = Math.floor(audio.duration / 60);
		var durSeconds = Math.floor(audio.duration - durMinutes * 60);

		var playProgress = (audio.currentTime / audio.duration) * 100;

		if (curMinutes < 10)
			curMinutes = '0' + curMinutes;

		if (curSeconds < 10)
			curSeconds = '0' + curSeconds;

		if (durMinutes < 10)
			durMinutes = '0' + durMinutes;

		if (durSeconds < 10)
			durSeconds = '0' + durSeconds;

		tProgress.text(curMinutes + ':' + curSeconds);

		tTime.text(durMinutes + ':' + durSeconds);

		seekBar.width(playProgress + '%');

		if (playProgress == 100) {
			$('#playPause i').attr('class', 'fa fa-play');
			seekBar.width(0);
			tProgress.text('00:00');
		}
	}

	function getList() {
		var service = new playlistService();
		service.getAllPlaylists(initPlayer);
	}

	function initPlayer() {
		audio = new Audio();

		// Add the URL of audio source file to be played
		audio.src = './songs/layam.mp3';

		// Set looping to false to avoid audio from playing again
		audio.loop = true;

		playPause.on('click', play_pause);

		sArea.mousemove(function (event) {
			showHover(event);
		});

		sArea.mouseout(hideHover);

		$(audio).on('timeupdate', updateCurrTime);
	}
});

function displayPlayer(playlist) {

	var id = playlist.id;

	var sources = JSON.parse(playlist.data.songs);

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