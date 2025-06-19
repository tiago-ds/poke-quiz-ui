import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'quiz-option',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './quiz-option.component.html',
	styleUrls: ['./quiz-option.component.scss'],
})
export class QuizOptionComponent {
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
