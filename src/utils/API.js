async function apicall(id) {
	const movies = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=acd45b564463fb4a98952313a103fed2&with_networks=${id}`);
	const moviesData = await movies.json();
	return moviesData;
}
export default apicall;