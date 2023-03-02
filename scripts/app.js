const loadData = async () => {
	const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
	const data = await res.json();
	ShowData(data.data.tools);
};
loadData();
const ShowData = (tools) => {
	const cardContainer = document.getElementById('card-container');
	tools.forEach((tool) => {
		console.log(tool.name);
	});
};
