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

	constructor() {
		this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
		this.hostEl = document.getElementById('app')! as HTMLDivElement;

		const importedNode = document.importNode(this.templateEl.content, true);

		this.formEl = importedNode.firstElementChild as HTMLFormElement;
		this.formEl.id = 'user-input';
		this.formEl.addEventListener('submit', this.submitHandler);

		this.insert();
	}

	insert() {
		this.hostEl.appendChild(this.formEl);
	}

	// es funkcia gasaumjobesebelia.
	validation() {
		const title = this.formEl.querySelector('#title')! as HTMLInputElement;
		const description = this.formEl.querySelector('#description')! as HTMLTextAreaElement;
		const people = this.formEl.querySelector('#people')! as HTMLInputElement;

		if (!title.value || !description.value || !people.value) {
			alert('Please fill all inputs.');
			return;
		} else {
			alert('Validation correct.');
		}
	}

	@autoBind
	submitHandler(e: Event) {
		e.preventDefault();
		this.validation();
	}
}

const projectInput = new ProjectInput();
