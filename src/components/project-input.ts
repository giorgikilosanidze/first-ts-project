import prjItem from './project.item.js'; // es default exportis shemoimporteba roca xdeba. da saxeli rac ginda is shegilia daarkva egreve. as-is dachera ar chirdeba.
import { autoBind as Autobind } from '../decorators/autobind.js'; // es saxelis gadarkmevaa.
import * as validate from '../utility/validation.js'; // ak validacia isedac erti funkciaa marto mara ramdenime rame ro kopiliko shemosaimportebeli es gamodgeboda. kvelapers aimporteb saxels arkmev rasac ginda da wertilit wvdebi mere konkretul funkcias an nebismier ragacas. kvemot weria validate funkciaze magaliti.

export class ProjectInput {
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

	@Autobind
	submitHandler(e: Event) {
		e.preventDefault();
		const projectData = validate.validation(
			this.title.value,
			this.description.value,
			+this.people.value
		);
		if (projectData) {
			new prjItem(projectData);
			this.title.value = '';
			this.description.value = '';
			this.people.value = '';
		}
	}
}
