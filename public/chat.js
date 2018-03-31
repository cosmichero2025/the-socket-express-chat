// Made connection
const socket = io.connect('https://cryptic-dawn-44332.herokuapp.com/');

let message = document.querySelector('#message');
handle = document.querySelector('#handle');
btn = document.querySelector('#send');
output = document.querySelector('#output');
feedback = document.querySelector('#feedback');

// Emit events
btn.addEventListener('click', () => {
	if (message.value.length === 0) {
		return;
	} else {
		socket.emit('chat', {
			message: message.value,
			handle: handle.value,
      time: moment().add(3, 'days').calendar()
		});
		message.value = '';
		socket.emit('cancel-typing');
	}
});

message.addEventListener('keyup', e => {
	let firstLetter = message.value.charCodeAt(0);
	if (message.value.length === 0) {
		socket.emit('cancel-typing');
	} else if (e.keyCode === 13) {
		if (firstLetter === 10) {
			console.log('Maybe you should enter a message dude?');
		} else {
			socket.emit('chat', {
				message: message.value,
				handle: handle.value,
        time: moment().add(3, 'days').calendar()
			});
		}
    socket.emit('cancel-typing');
    message.value = '';

	} else {
		socket.emit('typing', handle.value);
	}
});

// Listener events

socket.on('chat', data => {
	output.innerHTML += `
  <div>
  <span>${data.time}</span>
  <p><strong>${data.handle}:</strong>${data.message}</p></div>`;
});

socket.on('typing', data => {
	feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});

socket.on('cancel-typing', () => (feedback.innerHTML = ''));
