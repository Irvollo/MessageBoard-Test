var parseID = 'S3xckocUdCI7ICTSJWZnBr3wQJU8ocr1F5DYErCe';
var parseRestKey = '8kaYXfz78Bm7VziKTRLTIiOLLpyFGOA7nAdjpa17';

$(document).ready(function() {
	getMessages();
	('#send').click(function() {
		var username = $('input[name=username]').attr();
		var message = $('input[name=message]').attr();
		alert(username + '!');
	});
});