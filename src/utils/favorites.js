export default function Favorites() {
	this.favorites = this.get()
	console.log(this.favorites);
	this.get = () => {
		return new Set(JSON.parse(localStorage.getItem('favorites'))) || new Set();
	}
	this.add = (url) => {
		console.log('favorite', url);
		console.log('current facorites', this.favorites);
		return localStorage.setItem('favorites', JSON.stringify(this.favorites));
	}
	this.remove = (url) => {
		this.favorites.delete(url);
		console.log('remove favorite', url);
		console.log('current facorites', this.favorites);
		return localStorage.setItem('favorites', JSON.stringify(this.favorites));
	}
	this.check = (url) => {
		console.log('contains favorite', url);
		return this.favorites.has(url);
	}
	this.init = () => {
		return localStorage.setItem('favorites', JSON.stringify([]));
	}
}
