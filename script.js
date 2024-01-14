const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let lowerStr = str.toLowerCase();

	return fruit.filter(function(element) {		
		return element.toLowerCase().includes(lowerStr);
		});
}

function searchHandler(e) {
	const inputValue = e.target.value.trim();

	if (inputValue !== "") {
		const results = search(inputValue);
		showSuggestions(results, inputValue);
	} else {
		showSuggestions([], "");
	}
}

function inBold(element, inputVal) {
	let lowerInputVal = inputVal.toLowerCase();
	let regex = new RegExp(lowerInputVal, "gi");
	
	let result = element.replace(regex, function(match) {
		return `<strong>${match}</strong>`;
	});
	return result;
}

function showSuggestions(results, inputVal) {
	suggestions.innerHTML = "";

	if (results.length > 0) {
        results.forEach(function(element) {
			let newResult = document.createElement("li");
			newResult.innerHTML = inBold(element, inputVal);
			newResult.classList.add("valid-suggestion");
			suggestions.appendChild(newResult);
		});
		suggestions.style.display = "block";
    } else if (inputVal.trim() !== "") {
		let errorMsg = document.createElement("li");
		errorMsg.textContent = "No suggestion found..";
		suggestions.appendChild(errorMsg);
		suggestions.style.display = "block";
    } else {
		suggestions.style.display = "none";
	}
}

function useSuggestion(e) {
	if (e.target.classList.contains("valid-suggestion")) {
		input.value = e.target.textContent;
		suggestions.textContent = "";
	}
}

function eventManager() {
	document.addEventListener("click", function(event) {
		if (!input.contains(event.target) && !suggestions.contains(event.target))
			suggestions.style.display = "none";
	});
	input.addEventListener('keyup', searchHandler);
	suggestions.addEventListener('click', useSuggestion);
}

eventManager();
