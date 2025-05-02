interface DataObject {
	title: string;
	description: string;
	people: number;
}

function autoBind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
}

class ProjectInput {
	templateEl: HTMLTemplateElement;
	formEl: HTMLFormElement;
	hostEl: HTMLDivElement;
	title: HTMLInputElement;
	description: HTMLTextAreaElement;
	people: HTMLInputElement;

	constructor() {
		this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
		this.hostEl = document.getElementById('app')! as HTMLDivElement;

		const importedNode = document.importNode(this.templateEl.content, true);

		this.formEl = importedNode.firstElementChild as HTMLFormElement;
		this.formEl.id = 'user-input';
		this.formEl.addEventListener('submit', this.submitHandler);

		this.title = this.formEl.querySelector('#title')! as HTMLInputElement;
		this.description = this.formEl.querySelector('#description')! as HTMLTextAreaElement;
		this.people = this.formEl.querySelector('#people')! as HTMLInputElement;

		this.insert();
	}

	insert() {
		this.hostEl.appendChild(this.formEl);
	}

	validation() {
		if (!this.title.value || !this.description.value || !this.people.value) {
			alert('Please fill all inputs.');
			return false;
		} else {
			const validatedObject: DataObject = {
				title: this.title.value,
				description: this.description.value,
				people: +this.people.value,
			};
			return validatedObject;
		}
	}

	@autoBind
	submitHandler(e: Event) {
		e.preventDefault();
		const projectData = this.validation();
		if (projectData) {
			new ProjectItem(projectData);
			this.title.value = '';
			this.description.value = '';
			this.people.value = '';
		}
	}
}

class ProjectList {
	templateEl: HTMLTemplateElement;
	prjSection: HTMLElement;
	hostEl: HTMLDivElement;

	constructor(state: 'active' | 'finished') {
		this.templateEl = document.getElementById('project-list')! as HTMLTemplateElement;
		this.hostEl = document.getElementById('app')! as HTMLDivElement;

		const importedNode = document.importNode(this.templateEl.content, true);
		this.prjSection = importedNode.firstElementChild as HTMLElement;
		this.prjSection.id = `${state}-projects`;

		if (state === 'active') {
			this.prjSection.querySelector('h2')!.textContent = 'Active Projects';
		} else {
			this.prjSection.querySelector('h2')!.textContent = 'Finished Projects';
		}

		this.prjSection.addEventListener('dragover', this.dragOver);
		this.prjSection.addEventListener('drop', this.dropHandler);
		this.prjSection.addEventListener('dragleave', this.dragLeave);

		this.insert();
	}

	@autoBind
	dragOver(e: DragEvent) {
		if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
			e.preventDefault();
			const listEl = this.prjSection.querySelector('ul')!;
			listEl.classList.add('droppable');
		}
	}

	@autoBind
	dropHandler(e: DragEvent) {
		const prjId = e.dataTransfer!.getData('text/plain');
		this.prjSection.querySelector('ul')!.appendChild(document.getElementById(prjId)!);
		this.prjSection.querySelector('ul')!.classList.remove('droppable');
	}

	@autoBind
	dragLeave(_: DragEvent) {
		const listEl = this.prjSection.querySelector('ul')!;
		listEl.classList.remove('droppable');
	}

	insert() {
		this.hostEl.appendChild(this.prjSection);
	}
}

class ProjectItem {
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

const createProjectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
