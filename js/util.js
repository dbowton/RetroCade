async function getGameData(game)
{
	let data = {};
	await $.ajax({
		type: "GET",
		url: "/getGameData/"+game,
		success: function(res){
			data = res;
		}
	});
	return data;
}

async function setGameData(game, data)
{
	let form = new FormData();

	form.append("data", data);

	$.ajax({
		type:"POST",
		url: "/setGameData/"+game,
		data:form,
		success:function(res){
			console.log(res);
		}
	});
}