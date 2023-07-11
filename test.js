const word =
	'998244353998244353998244353998244353998244353998244353998244353998244353998244353998244353';
const m = 3;
let result = [];
let init = 0;

word.split('').forEach((v, i) => {
	init = init * 10 + Number(v);
	result[i] = init % m === 0 ? 1 : 0;
});
