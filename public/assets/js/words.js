var WORDS = [
	"tiger",
	"crocodile",
	"chicken",
	"spider",
	"butterfly",
	"turtle",
	"cricket",
	"rabbit",
	"cockroach",
	"dragonfly",
	"elephant",
	"squirrel",
	"chameleon",
	"donkey",
	"giraffe",
	"horse",
	"monkey",
	"octopus",
	"peacock",
	"shrimp",
	"apple",
	"banana",
	"watermelon",
	"avocado",
	"cherry",
	"chocolate",
	"coconut",
	"cucumber",
	"guava",
	"pineapple",
	"strawberry",
	"swimming",
	"football",
	"basketball",
	"badminton",
	"baseball",
	"bowling",
	"chess",
	"karate",
	"marathon",
	"wrestling",
	"surfing"
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

function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}
