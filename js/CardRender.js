$(document).ready(async function(){

	var gamelist = (await getGameList()).games;

	for(var i = 0; i < gamelist.length; i++){
		const game = gamelist[i];
		const html = `<div class="minusPadding">
		<a href="/${game.name}">
		<div class="row">
			<div class="card cardSize" id="cardPadding">
				<h4 class="title">${game.name}</h4>
				
				<div class="card-body side-by-side">
					<img class="imgSize" src="~/css/pics/${game.image}" />
					<div class="text-left">
						<h6>Genre: Genre</h6>
						<h6>Game Description: <p class="dSize">${game.description}</p>
						</h6>
					</div>
				</div>
			</div>
			</a>
		</div>`

		$("#list").append(html);
	}




	
})