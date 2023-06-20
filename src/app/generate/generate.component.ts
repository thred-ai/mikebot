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
  width: number = 512;
  height: number = 512;

  changeWidth(event: any) {
    this.width = Number(event.value) ?? 512;
  }

  changeHeight(event: any) {
    this.height = Number(event.value) ?? 512;
  }

  widthChanged(newWidth: number){
    if (newWidth == 1024 && this.height > 768){
      this.height = 768
    }
    this.width = newWidth
  }

  heightChanged(newHeight: number){
    if (newHeight == 1024 && this.width > 768){
      this.width = 768
    }
    this.height = newHeight
  }

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
      name: 'Remove Text',
      text: 'No text',
      title: 'Would you like to remove text?',
      neg_text:
        'text, watermark, letters, alphabet, Graffiti, typography, bad text, language',
      active: true,
    },
    {
      name: 'Ultra Realistic',
      text: 'ultra detailed, hyper realistic, professional lighting, RAW, prophoto rgb, 16bit, 35mm',
      title: 'Would you like the image to look Ultra Realistic?',
      neg_text:
        'blur, haze, too many fingers, overexposed, cropped head, bad frame, out of frame, deformed, cripple, old, fat, ugly, poor, missing arm, extra arms, extra legs, extra head, extra face',
      active: true,
    },
  ];

  loading = false;

  async generateDesign(type: 'other' | 'logo' = this.selectedType) {
    var prompt = this.prompts.filter((p) => p.trim() != '').join(',');
    var neg_prompt = this.negativePrompts
      .filter((p) => p.trim() != '')
      .join(',');

    if (prompt && prompt != '') {
      this.autofills.forEach((m) => {
        if (m.active) {
          prompt += ', ' + m.text;
          neg_prompt += ', ' + m.neg_text;
        }
      });
      console.log(prompt);
      console.log(neg_prompt);

      this.loading = true;

      let dimensions = {
        width: this.width,
        height: this.height,
      };

      var result: string | undefined;

      try {
        result = await this.l.generate(prompt, neg_prompt, type, dimensions);
      } catch (error) {
        try {
          result = await this.l.generate(prompt, neg_prompt, type, dimensions);
        } catch (error) {
          console.log(error);
        }
      }
      console.log(result);
      this.loading = false;
      if (result){
        this.imageChanged.emit(result);
      }
    }
  }

  formatLabel(value: number): string {
    // if (value >= 1000) {
    //   return Math.round(value / 1000) + 'k';
    // }

    return `${value}` + 'px';
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
