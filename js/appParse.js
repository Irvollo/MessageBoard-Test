var parseID = 'S3xckocUdCI7ICTSJWZnBr3wQJU8ocr1F5DYErCe';
var parseRestKey = '8kaYXfz78Bm7VziKTRLTIiOLLpyFGOA7nAdjpa17';

$(document).ready(function() {
	getMessages();
	$('.table tbody').on('click', 'td a.linkdeleteuser', deleteMessage);
	$('#send').click(function() {
		var username = $('input[name=username]').attr('value');
		var message = $('input[name=message]').attr('value');
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
					+ '</td><td>'
					+ '<a class="linkdeleteuser" name="'+ value.objectId +'" rel="'+ value.objectId +'">Delete</a>'
					+ '</td></tr>');
		table.append(trEl);
	});
	console.log(messages); 
}


function deleteMessage(event) {
	event.preventDefault();
	var con = confirm('Are you sure you want to delete this message?');
	console.log($(this).attr('rel'));
	if(con === true) {
		$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard/' + $(this).attr('rel'),
			headers: {
				'X-Parse-Application-Id': parseID,
				'X-Parse-REST-API-Key': parseRestKey
			},
			contentType: 'application/json',
			dataType: 'json',
			type: 'DELETE',
			success: function() {
				console.log('success');
				getMessages();
			}, 
			error: function() {
				console.log('ERROR!');
			}
		});
	}
}