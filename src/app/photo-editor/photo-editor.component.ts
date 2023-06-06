import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  ElementRef,
  OnInit,
} from '@angular/core';
import { PhotoEditorSDKUI, EditorApi, ContainedPrimaryButton } from 'photoeditorsdk/no-polyfills';
import styled from 'styled-components';


const license = '';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
})
export class PhotoEditorComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {

  }

  @Input()
  public src: string = '';

  ExportButton = styled(ContainedPrimaryButton)`
  color: ${({ theme }) => theme.button.containedPrimaryForeground}
  background: ${({ theme }) => theme.button.containedPrimaryBackground}
`;

  @ViewChild('psdkContainer', { static: false })
  private container: ElementRef<HTMLDivElement> | null = null;


  public editor: EditorApi | null = null;


  ngAfterViewInit() {
    this.initEditor();
  }


  async initEditor() {
    try {
      if (this.editor) {
        this.editor.dispose();
      }

      this.editor = await PhotoEditorSDKUI.init({
        license,
        container: this.container ? this.container.nativeElement : '',
        image: this.src,
        assetBaseUrl: '/assets/photoeditorsdk',
      });

      let btn = document.querySelector('[data-test="MainBarButtonClose"]')

      btn.remove()
      console.log(btn)
      // this.editor.on('close' as any, () => this.editor.dispose());
    } catch (error) {
      console.log(error);
    }
  }
}
