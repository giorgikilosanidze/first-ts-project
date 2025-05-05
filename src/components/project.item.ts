import { autoBind } from '../decorators/autobind.js';
import { type DataObject } from '../utility/validation.js'; // rodesac typebs da interfacebs vaimportebt xandaxan sachiroa ro win davuwerot type keyword, gaachnia proektis setups da build tools. dziritadad araris sachiro da rekomendirebuli, magram xandaxan aucilebelia. tu prchxilebis shignit davwert types gamodis ro konkretulad ris winac davwert imaze vambobt ro type an interfaceia magram tu prchxilebis garet davwert eseigi vgulisxmobt ro prchxilebis shignit kvelaperi type an interfaceia. es xandaxan sachiroa imistvis ro typescriptistvis an build toolistvis gasagebi ikos ro rac shemovaimportet marto typescriptis featuria da araris iseti kodi romlis kompilaciac xdeba javasckriptis kodshi.

export const something = 'something'; // es imistvis weria ro prosta gasagebi ikos ro default exporti ert fileshi marto erti rame sheidzleba ikos da danarcheni chveulebrivi exportit unda dgaexportdes.

export default class ProjectItem {
	data: DataObject;
	templateEl: HTMLTemplateElement;
	itemEl: HTMLLIElement;
	hostEl: HTMLUListElement;

	constructor(data: DataObject) {
		this.data = data;
		this.templateEl = document.getElementById('single-project')! as HTMLTemplateElement;
		this.hostEl = document
			.getElementById('active-projects')!
			.querySelector('ul')! as HTMLUListElement;

		const importedNode = document.importNode(this.templateEl.content, true);
		this.itemEl = importedNode.firstElementChild as HTMLLIElement;
		this.itemEl.id = 'id-' + Math.random().toString(36).slice(2, 8);

		this.itemEl.addEventListener('dragstart', this.dragStart);
		this.itemEl.addEventListener('dragend', this.dragEnd);

		this.insert();
	}

	@autoBind
	dragStart(e: DragEvent) {
		e.dataTransfer!.setData('text/plain', this.itemEl.id);
		e.dataTransfer!.effectAllowed = 'move';
	}

	@autoBind
	dragEnd(_: DragEvent) {
		console.log('drag end');
	}

	insert() {
		const h2 = this.itemEl.querySelector('h2')!;
		const h3 = this.itemEl.querySelector('h3')!;
		const p = this.itemEl.querySelector('p')!;

		h2.textContent = this.data.title;
		h3.textContent = this.data.people.toString() + ' assigned';
		p.textContent = this.data.description;
		this.hostEl.append(this.itemEl);
	}
}
