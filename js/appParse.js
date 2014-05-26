var parseID = 'S3xckocUdCI7ICTSJWZnBr3wQJU8ocr1F5DYErCe';
var parseRestKey = '8kaYXfz78Bm7VziKTRLTIiOLLpyFGOA7nAdjpa17';

$(document).ready(function() {
	getMessages();
	$('#send').click(function() {
		var username = $('input[name=username]').attr('value');
		var message = $('input[name=message]').attr('value');
		alert(username + '!');
		$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard',
			headers: {
				'X-Parse-Application-Id': parseID,
				'X-Parse-REST-API-Key': parseRestKey
			},
			contentType: 'application/json',
			dataType: 'json',
			processData: false,
			data: JSON.stringify({
				'username':username,
				'message':message
			}),
			type:'POST',
			success: function() {
				console.log('sent');
				getMessages();
			},
			error: function() {
				conole.log('error');
			}
		});
	});
});

function getMessages() {
	$.ajax({
		url: 'https://api.parse.com/1/classes/MessageBoard',
		headers: {
			'X-Parse-Application-Id': parseID,
			'X-Parse-REST-API-Key': parseRestKey
		},
		contentType: 'application/json',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			console.log('success');
			updateView(data);
		}, 
		error: function() {
			console.log('ERROR!');
		}
	});
}

function updateView(messages) {
	var table = $('.table tbody');
	table.html('');
	$.each(messages.results, function(index, value) {
		var trEl = $('<tr><td>'
					+ value.username
					+ '</td><td>'
					+ value.message
					+ '</td></tr>');
		table.append(trEl);
	});
	console.log(messages); 
}