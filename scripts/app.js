// ! loading the data from the database.
const loadToolInfo = async () => {
	const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
	const data = await res.json();
	ShowCards(data.data.tools);
};

const ShowCards = (tools) => {
	const cardContainer = document.getElementById('card-container');

	tools.forEach((tool) => {
		const { name, image, published_in, features, id } = tool;
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
                        <small class="text-gray-500"><i class="fa-solid fa-calendar-days"></i> ${published_in}</small>
                     </div>
                     <div>
                        <label for="card-details-modal" onclick="loadToolDetails('${id}')" class="btn btn-primary rounded-full"><i class="fa-solid fa-arrow-right"></i>
                        </label>
                     </div>
                  </div>
               </div>
            </div>
      `;
	});
};

const loadToolDetails = async (id) => {
	const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
	const res = await fetch(URL);
	const data = await res.json();
	showToolDetails(data.data);
};

const showToolDetails = (toolDetails) => {
	console.log(toolDetails);
	const modalContainer = document.getElementById('modal-container');
	modalContainer.innerHTML = '';
	const { tool_name, description, pricing, features, id } = toolDetails;
	modalContainer.innerHTML += `
   <div>
      <div>
         <p class="font-semibold">${description}</p>
         <div class="flex gap-2 text-center justify-between font-semibold">
            <div class="p-3 rounded-lg bg-white text-green-500">
               <p>${pricing ? pricing[0].price : ''}</p>
               <p>${pricing[0].plan}</p>
            </div>
            <div class="p-3 rounded-lg bg-white  text-orange-600">
               <p>${pricing[1].price}</p>
               <p>${pricing[1].plan}</p>
            </div>
            <div class="p-3 rounded-lg bg-white  text-red-500">
               <p>${pricing[2].price}</p>
               <p>${pricing[2].plan}</p>
            </div>
         </div>
         <div class="feature">
            <ol id="feature-list" class="list-decimal list-inside">
                     <li>${features['1'].feature_name}</li>
                     <li>${features['2'].feature_name}</li>
                     <li>${features['3'].feature_name}</li>
      ${features['4'] ? `<li>${features['4'].feature_name}</li>` : ''}
            </ol>
         </div>
      </div>
   </div>
   `;
};
