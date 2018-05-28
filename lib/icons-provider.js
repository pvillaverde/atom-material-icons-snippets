'use babel';

const icons = require('../data/mdIcons');

class IconsProvider {
	constructor() {
		this.selector = '*';
		this.suggestionPriority = 2;
	}

	getSuggestions({
		prefix
	}) {
		if (prefix.startsWith('md_')) {
			return this.findMatchingSuggestions(prefix);
		}
	}

	findMatchingSuggestions(replacementPrefix) {
		let prefixBase = replacementPrefix.replace(/^md_/, '');
		let matchingIcons = icons.filter((icon) => {
			let isIdMatch = icon.id.match(prefixBase);
			//let isTermMatch = !!this.findTerm(prefixBase, icon.terms);
			return isIdMatch /* || isTermMatch*/ ;
		});
		let createSuggestion = this.createSuggestion.bind(this, replacementPrefix, prefixBase);
		return matchingIcons.map(createSuggestion);
	}

	findTerm(prefixBase, terms) {
		if (prefixBase.length > 0) {
			return terms.find((term) => {
				return term.match(prefixBase);
			});
		}
	}


	createSuggestion(replacementPrefix, prefixBase, icon) {
		return {
			className: 'icon-provider ',
			type: 'value',
			iconHTML: '<i class="material-icons">' + icon.unicode + '</i>',
			//leftLabel: '',
			displayText: icon.id,
			snippet: icon.body,
			rightLabel: icon.unicode,
			description: 'Material Icon: ' + icon.id,
			//descriptionMoreURL: versionInfo.iconMoreRoot + icon.id + (icon.style ? '?style=' + icon.style : ''),
			replacementPrefix: replacementPrefix // fixes double prefix bug
		};
	}
}
export default new IconsProvider();