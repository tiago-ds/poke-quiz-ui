import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

/** How an option renders: neutral while answering, marked up once revealed. */
export type OptionState = 'idle' | 'correct' | 'wrong' | 'faded';

@Component({
	selector: 'quiz-option',
	imports: [NgClass],
	templateUrl: './quiz-option.component.html',
	styleUrls: ['./quiz-option.component.scss'],
})
export class QuizOptionComponent {
	@Input() type!: string;

	@Input() isChecked = false;

	@Input() state: OptionState = 'idle';

	@Input() disabled = false;

	@Output() selectionChange = new EventEmitter<{
		type: string;
		isChecked: boolean;
	}>();

	onCheckboxChange(event: Event): void {
		this.selectionChange.emit({
			type: this.type,
			isChecked: (event.target as HTMLInputElement).checked,
		});
	}
}
