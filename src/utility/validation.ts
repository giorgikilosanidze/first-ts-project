namespace App {
	export interface DataObject {
		title: string;
		description: string;
		people: number;
	}

	export function validation(
		title: string,
		description: string,
		people: number
	): DataObject | void {
		if (title.trim().length === 0 || description.trim().length === 0 || people <= 0) {
			alert('Please fill all inputs.');
			return;
		} else {
			return { title, description, people };
		}
	}
}
