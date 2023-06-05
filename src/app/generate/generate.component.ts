import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadService } from '../load.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {
  ngOnInit(): void {}

  @Output() imageChanged = new EventEmitter<string>();

  prompt = '';
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

  loading = false;

  setPrompt(event: any) {
    this.prompt = event.target.value as string;
  }

  async generateDesign(
    type: 'other' | 'logo' = this.selectedType,
    prompt = this.prompt && this.prompt.trim() != '' ? this.prompt : undefined
  ) {
    if (prompt) {
      console.log(type)
      this.loading = true;
      let result = await this.l.generate(prompt, type);
      console.log(result);
      this.loading = false;
      this.imageChanged.emit(result);
    }
  }

  constructor(private l: LoadService) {}
}
