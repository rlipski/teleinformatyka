class App {
	constructor() {
		this.methods = document.querySelectorAll("nav ul li a");
		if (localStorage.getItem('activeMethod') !== null) {
			var activeMethod = document.querySelector(`[data-method = ${localStorage.getItem('activeMethod')}]`);
			activeMethod.classList.add('active');
		}
		this.methods.forEach((elem) => {
			elem.addEventListener('click', (e) => {
				this.setActiveMethod(e.target);
			});
		});
	}

	setActiveMethod(target) {
		let method = target.getAttribute('data-method');
		if (localStorage.getItem('activeMethod') !== method) {
			if (localStorage.getItem('activeMethod') !== null) {
				let prevMethod = document.querySelector(`[data-method = ${localStorage.getItem('activeMethod')}]`);
				if (prevMethod.classList.contains('active')) {
					prevMethod.classList.remove('active');
				}
			}
			this.activeMethod = method;
			localStorage.setItem('activeMethod', method);
			target.classList.add('active');
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	let app = new App;
});