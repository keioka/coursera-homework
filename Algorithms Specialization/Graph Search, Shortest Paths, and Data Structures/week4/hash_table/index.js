function Node(key, value) {
	this.key = key;
	this.value = value;
	this.next = null;
}

Node.prototype.addNext = function(value){
	this.next = new Node(value);
};

function getHashKey(key) {
	return key.split("").map(letter => letter.charCodeAt()).reduce((acc, cur) => acc + cur, 0);
}

function Hashtable() {
	this.data = [];
}

Hashtable.prototype.add = function(key, value){

	// Get Index by calling getHashKey
	const hashKey = getHashKey(key);

	// Access this data
	let head = this.data[hashKey];
	let modify = false;

	// If there is not any nodes just add it
	if (!head) {
		this.data[hashKey] = new Node(key, value);
		return;
	} 

	// If there is some nodes, traverse to the end
	while (head.next) {
		if (head.key === key) {
			head.value = value;
			modify = true;
		}

		head = head.next;
	}

	// Check last node to modify
	if (head.key === key) {
		head.value = value;
		modify = true;
	} 

	if (!modify) {
		head.next = new Node(key, value);
	}
};

Hashtable.prototype.get = function(key){

	// Get Index by calling getHashKey
	const hashKey = getHashKey(key);

	// Access this data
	let head = this.data[hashKey];

	// If there is some nodes, traverse to the end
	while (head.key !== key) {
		head = head.next;
	}

	return head.value;
};

Hashtable.prototype.keys = function(){
	const keys = [];
	for (var node of this.data) {
		if (node) {
			while (node) {
				keys.push(node.key);
				node = node.next;
			}
		}
	}
	return keys;
}



const hash = new Hashtable();
hash.add('kei', 1);
hash.add('oka', 40);
hash.add('age', 28);
hash.add('age', 29);
hash.add('a', 20);
hash.add('mo', 30);

console.log(hash.get('kei'));
console.log(hash.get('oka'));
console.log(hash.get('age'));
// console.log(hash)

console.log(hash.keys())

for (var key of hash.keys()) {
	console.log(hash.get(key));
}