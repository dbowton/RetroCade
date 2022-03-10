$(document).ready(async function () {
	var gamelist = (await getGameList()).games;

	for (var i = 0; i < gamelist.length; i++) {
		const game = gamelist[i];
		const html = `<div class="minusPadding">
		<a href="/games/${game.name}">
		<div class="row">
			<div class="card cardSize" id="cardPadding">
				<h4 class="title" id="cardText">${game.name}</h4>
				
				<div class="card-body side-by-side">
					<img class="imgSize" src="/images/${game.image}" />
					<div class="text-left">
						<h6 id="cardText">Genre: ${game.genre}</h6>
						<h6 id="cardText">Game Description: <p class="dSize" id="cardText">${game.description}</p>
						</h6>
					</div>
				</div>
			</div>
			</a>
		</div>`

		$("#list").append(html);
	}
})