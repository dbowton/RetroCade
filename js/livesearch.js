$(document).ready(function () {
	$.ajaxSetup({
		cache: false
	});

	$('#search').keyup(async function () {
		$('#result').html('');
		$('#state').val('');
		var searchField = $('#search').val().toLowerCase();
		let gameList = await getGameList();

		$.each(gameList.games, function (key, value) {
			if (value.name.toLowerCase().includes(searchField)) {
				$('#result').append(
					`<a href="/games/${value.name}"><div><li class="list-group-item link-class">  <img src="/images/${value.image}
					" height="40" width="40" class="img-thumbnail" /> ${value.name} <div>`);
			}
			$('#result').show();
		});
		
	});

	$('body').click(function(evt) {
		if(evt.target.id == 'result')
		return;
		$('#result').hide();
	})
});