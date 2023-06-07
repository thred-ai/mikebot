import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadService } from '../load.service';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {
  ngOnInit(): void {}

  @Output() imageChanged = new EventEmitter<string>();

  selectedType: 'other' | 'logo' = 'other';

  types = [
    {
      name: 'Logo Graphic',
      id: 'logo',
    },
    {
      name: 'Other Design',
      id: 'other',
    },
  ];

  autofills = [
    {
      name: 'No Text',
      text: 'No text',
      neg_text:
        'text, watermark, letters, alphabet, Graffiti, typography, bad text, language',
      active: false,
    },
    {
      name: 'Realistic',
      text: 'ultra detailed, hyper realistic, professional lighting, RAW, prophoto rgb, 16bit, 35mm',
      neg_text:
        'blur, haze, too many fingers, overexposed, cropped head, bad frame, out of frame, deformed, cripple, old, fat, ugly, poor, missing arm, extra arms, extra legs, extra head, extra face',
      active: false,
    },
  ];

  loading = false;

  async generateDesign(
    type: 'other' | 'logo' = this.selectedType,
  ) {
    var prompt = this.prompts.filter(p => p.trim() != "").join(",")
    var neg_prompt = this.negativePrompts.filter(p => p.trim() != "").join(",")

    if (prompt && prompt != "") {
      this.autofills.forEach(m => {
        if (m.active){
          prompt += ', ' + m.text
          neg_prompt += ', ' + m.neg_text
        }
      })
      console.log(prompt);
      console.log(neg_prompt);

      this.loading = true;
      let result = await this.l.generate(prompt, neg_prompt, type);
      console.log(result);
      this.loading = false;
      this.imageChanged.emit(result);
    }
  }

  constructor(private l: LoadService) {}

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  prompts: string[] = [];
  negativePrompts: string[] = [];

  addPrompt(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.prompts.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removePrompt(fruit: any): void {
    const index = this.prompts.indexOf(fruit);

    if (index >= 0) {
      this.prompts.splice(index, 1);
    }
  }

  editPrompt(fruit: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.removePrompt(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.prompts.indexOf(fruit);
    if (index >= 0) {
      this.prompts[index] = value;
    }
  }

  addNegPrompt(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.negativePrompts.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeNegPrompt(fruit: any): void {
    const index = this.negativePrompts.indexOf(fruit);

    if (index >= 0) {
      this.negativePrompts.splice(index, 1);
    }
  }

  editNegPrompt(fruit: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.removePrompt(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.negativePrompts.indexOf(fruit);
    if (index >= 0) {
      this.negativePrompts[index] = value;
    }
  }
}
