// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// 	response.json().then((data) => {
// 		console.log(data);
// 	});
// });

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msg = document.querySelector('#msg');
const forecastMsg = document.querySelector('#forecastMsg');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = input.value;
	msg.textContent = 'Loading..';
	forecastMsg.textContent = '';

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				msg.textContent = data.error;
			} else {
				msg.textContent = `${data.location}`;
				forecastMsg.textContent = `${data.forecast}`;
			}
		});
	});
});
