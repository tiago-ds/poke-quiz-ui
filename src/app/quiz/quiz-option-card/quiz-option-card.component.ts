import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Make sure this import is present

@Component({
	selector: 'quiz-option-card',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './quiz-option-card.component.html',
	styleUrls: ['./quiz-option-card.component.scss'],
})
export class QuizOptionCardComponent {
	@Input()
	type!: string;

	isChecked: boolean = false;
	@Output() selectionChange = new EventEmitter<{
		type: string;
		isChecked: boolean;
	}>();

	constructor() {}

	ngOnInit() {}

	onCheckboxChange(): void {
		this.selectionChange.emit({
			type: this.type,
			isChecked: this.isChecked,
		});
	}
}
