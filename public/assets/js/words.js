var WORDS = [
	"animal|tiger",
	"animal|crocodile",
	"animal|chicken",
	"animal|spider",
	"animal|butterfly",
	"animal|turtle",
	"animal|cricket",
	"animal|rabbit",
	"animal|dragonfly",
	"animal|elephant",
	"animal|squirrel",
	"animal|chameleon",
	"animal|giraffe",
	"animal|horse",
	"animal|octopus",
	"animal|peacock",
	"animal|shrimp",
	"fruit|apple",
	"fruit|watermelon",
	"fruit|avocado",
	"fruit|cherry",
	"fruit|chocolate",
	"fruit|coconut",
	"fruit|cucumber",
	"fruit|guava",
	"fruit|pineapple",
	"fruit|strawberry",
	"sport|swimming",
	"sport|football",
	"sport|basketball",
	"sport|badminton",
	"sport|baseball",
	"sport|bowling",
	"sport|chess",
	"sport|karate",
	"sport|marathon",
	"sport|wrestling",
	"sport|surfing"
]

function censor(word) {
	let censored = [];
	let length = word.length;
	let target = Math.ceil(length / 2);

	let range_start = 2;
	let range_end = target;

	for (let i = 0; i < length; i++) {
		let c = word.charAt(i);
		if (i >= range_start && i <= range_end) {
			censored.push("*");
		} else {
			censored.push(c);
		}
	}

	return censored.join("");
}

function copyArray(a) {
	let b = [];
	for (i = 0; i < a.length; i++) {
		b[i] = a[i];
	}
	return b;
}

function shuffle(a) {
	let j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return copyArray(a);
}
