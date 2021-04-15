const { parse } = require('node-html-parser');
const fs = require('fs');

async function main() {
	const lang = 'en';
	let i = 0;
	const cat = {};
	const content = fs.readFileSync(__dirname + '/test.html', 'utf-8');
	while (++i < 10000) {
		let root = parse(content);
		const parent = Math.random().toString();
		try {
			let title = (() => {
				const t = root.querySelector(`.shop-categories__title`);
				if (!t) {
					return root.querySelector(`.headList h1`);
				}
				return t;
			})();
			const name = title.text;
			// const name = JSON.parse(JSON.stringify(title.text)).trim();	// this line works fine.
			if (!cat[parent]) {
				cat[parent] = {
					name: {},
				};
			}
			cat[parent][`name`][lang] = name;

			if (!name) {
				console.error(`not found name`);
			}
		} catch (error) { console.error(error); }
		finally {
			title = null;
		}
	}
}

main();
