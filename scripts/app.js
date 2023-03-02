// ! loading the data from the database.
const loadData = async () => {
	const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
	const data = await res.json();
	ShowData(data.data.tools);
};

const ShowData = (tools) => {
	const cardContainer = document.getElementById('card-container');

	tools.forEach((tool) => {
		const { name, image, published_in, features } = tool;
		// console.log(tool);

		cardContainer.innerHTML += `
            <div class="card max-w-[340px] bg-base-100 shadow-xl">
               <figure>
                  <img class="h-44" src="${image}" alt="Shoes" />
               </figure>
               <div class="card-body">
                  <h2 class="card-title">Feature</h2>
                  <ol id="feature-list" class="list-decimal list-inside">
                     <li>${features[0]}</li>
                     <li>${features[1]}</li>
                     <li>${features[2]}</li>
      ${features[3] ? `<li>${features[3]}</li>` : ''}
                  </ol>
                  <hr class="my-2  border-gray-400">
                  <div class="flex justify-between items-center">
                     <div>
                     <h2 class="font-semibold text-xl mb-2">${name}</h2>
                     <p"><i class="fa-solid fa-calendar-days"></i> ${published_in}</p>
                     </div>
                     <div>
                     <button class="btn btn-primary rounded-full"><i class="fa-solid fa-arrow-right"></i></button>
                     </div>
                  </div>
               </div>
            </div>
      `;
	});
};
/**  

 */
