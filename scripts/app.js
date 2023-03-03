// ! loading the data from the database.
const loadToolInfo = async (sorted = false, dataLimit = 12) => {
	// starting loading animation
	loadingAnimation(true);

	const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
	const data = await res.json();
	ShowCards(data.data.tools, sorted, dataLimit);
};

// ! Showing Cards
const ShowCards = (tools, sorted, dataLimit) => {
	const cardContainer = document.getElementById('card-container');
	cardContainer.innerHTML = ``;
	const showBtnBox = document.getElementById('btn-show-more-box');

	// ! setting limited cards
	if (dataLimit === 6) {
		tools = tools.slice(0, dataLimit);
		showBtnBox.classList.remove('d-none');
	} else {
		showBtnBox.classList.add('d-none');
	}

	if (sorted === true) {
		const sortByDate = (a, b) => {
			const first = new Date(a.published_in);
			const second = new Date(b.published_in);
			if (first < second) {
				return 1;
			} else if (first > second) {
				return -1;
			} else {
				return 0;
			}
		};
		tools.sort(sortByDate);
	} else {
		tools = tools;
	}

	tools.forEach((tool) => {
		const { name, image, published_in, features, id } = tool;
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
                  <hr class="my-2 border-gray-400">
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

	// stopping loading animation
	loadingAnimation(false);
};

const loadToolDetails = async (id) => {
	const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
	const res = await fetch(URL);
	const data = await res.json();
	showToolDetails(data.data);
};

// ! showing details on the modal
const showToolDetails = (toolDetails) => {
	const modalContainer = document.getElementById('modal-container');
	modalContainer.textContent = '';

	const { description, pricing, features, integrations, image_link, input_output_examples, accuracy } = toolDetails;
	modalContainer.innerHTML += `
   <div class="flex flex-col-reverse md:flex-row justify-around gap-4 pt-3 lg:p-5">
      <div class="max-w-sm bg-red-200 border-1 border-red-600 rounded-lg p-5 shadow-xl">
         <div>
         <p class="font-bold text-xl">${description}</p>
         <div class="flex gap-2 text-center justify-between font-semibold my-3 text-xs">
            <div class="p-3 rounded-lg bg-white text-green-500 flex flex-col justify-center items-center">
               ${pricing === null ? `<p>free of cost</p>` : `<p>${pricing[0].price}</p>`}
               ${pricing === null ? `<p>Starter</p>` : `<p>${pricing[0].plan}</p>`}
            </div>
            <div class="p-3 rounded-lg bg-white  text-orange-600 flex flex-col justify-center items-center">
               ${pricing === null ? `<p>free of cost</p>` : `<p>${pricing[1].price}</p>`}
               ${pricing === null ? `<p>Pro</p>` : `<p>${pricing[1].plan}</p>`}
            </div>
            <div class="p-3 rounded-lg bg-white  text-red-500 flex flex-col justify-center items-center">
               ${pricing === null ? `<p>free of cost</p>` : `<p>${pricing[2].price}</p>`}
               ${pricing === null ? `<p>Enterprise</p>` : `<p>${pricing[2].plan}</p>`}
            </div>
         </div>
         <div class="flex flex-col lg:flex-row gap-y-3 justify-between items-start lg:items-center my-2 text-xs">
            <div class="feature">
                  <h2 class="text-xl font-semibold">Feature</h2>
                  <ol id="feature-list" class="list-disc list-inside">
                     <li>${features['1'].feature_name}</li>
                     <li>${features['2'].feature_name}</li>
                     <li>${features['3'].feature_name}</li>
                     ${features['4'] ? `<li>${features['4'].feature_name}</li>` : ``}
                  </ol>
            </div>
            <div>
               <h2 class="text-xl font-semibold">Integrations</h2>
                  ${
										integrations === null
											? `<p>No data found</p>`
											: `
               <ol id="feature-list" class="list-disc  list-inside">
                  <li>${integrations[0]}</li>
                  ${integrations[1] ? `<li>${integrations[1]}</li>` : ``}
                  ${integrations[2] ? `<li>${integrations[2]}</li>` : ``}
                  ${integrations[3] ? `<li>${integrations[3]}</li>` : ``}
                  ${integrations[4] ? `<li>${integrations[4]}</li>` : ``}
                  
               </ol>`
									}
            </div>
         </div>
      </div>
      </div>
      <div class="max-w-sm ">
         <div class="card bg-base-100 shadow-xl">
            <figure class="px-3 pt-3 relative">
               <img src="${image_link[0]}" alt="Shoes" class="rounded-xl " />
               ${
									accuracy.score !== null
										? `<p class="rounded-full bg-red-500 text-white text-xs py-1 px-3 absolute top-6 right-6">${
												accuracy.score * 100
										  }% accuracy</p>`
										: ``
								}
            </figure>
            <div class="card-body items-center text-center">
               ${
									input_output_examples
										? `<h2 class="card-title">${input_output_examples[0].input}</h2>`
										: `<h2 class="card-title">Can you give any example?</h2>`
								}
               ${
									input_output_examples
										? `<p class="">${input_output_examples[0].output}</p>`
										: `<p class="">No! Not Yet! Take a break!!!</p>`
								}
            </div>
            </div>
      </div>
   </div>
   `;
};

// ! loading animation function
const loadingAnimation = (isLoading) => {
	const loader = document.getElementById('loader');
	if (isLoading) {
		loader.classList.remove('d-none');
	} else {
		loader.classList.add('d-none');
	}
};

const sort = () => {
	loadToolInfo(true);
};
