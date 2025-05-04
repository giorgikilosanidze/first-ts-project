/// <reference path="project-item.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../utility/validation.ts" />

namespace App {
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

		@autoBind
		submitHandler(e: Event) {
			e.preventDefault();
			const projectData = validation(
				this.title.value,
				this.description.value,
				+this.people.value
			);
			if (projectData) {
				new ProjectItem(projectData);
				this.title.value = '';
				this.description.value = '';
				this.people.value = '';
			}
		}
	}
}
