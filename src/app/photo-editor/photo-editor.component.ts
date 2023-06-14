import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  ElementRef,
  OnInit,
  HostListener,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import {
  PhotoEditorSDKUI,
  EditorApi,
  ContainedPrimaryButton,
} from 'demo-vai/no-polyfills';
import styled from 'styled-components';

const license = '';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
})
export class PhotoEditorComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    this.loading = true;
  }

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  @Input()
  public src: string = '';

  ExportButton = styled(ContainedPrimaryButton)`
  color: ${({ theme }) => theme.button.containedPrimaryForeground}
  background: ${({ theme }) => theme.button.containedPrimaryBackground}
`;

  @ViewChild('psdkContainer', { static: false })
  private container: ElementRef<HTMLDivElement> | null = null;
  loading = false;

  public editor: EditorApi | null = null;

  ngAfterViewInit() {
    this.initEditor();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log(event);
    // this.redrawCanvas();
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

      let btn = document.querySelector('[data-test="MainBarButtonClose"]');
      // let btn2 = document.querySelector('[data-test="MainBarButtonExport"]');

      btn.remove();
      // btn2.remove();
      let w = document.querySelector('[data-test="Watermark"]');

      // canvas.remove();
      w.remove();

      // this.editor.on('close' as any, () => this.editor.dispose());
    } catch (error) {
      console.log(error);
    }
  }


}
