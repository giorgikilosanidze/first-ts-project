/// <reference path="../decorators/autobind.ts" />

namespace App {
	export class ProjectList {
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
}
