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
  CustomToolbarItemProps,
  AdvancedUIToolbarItem,
} from 'demo-vai/no-polyfills';
import styled, { css } from 'styled-components';
//@ts-ignore
import generateToolbarItems from './photo-editor-react.tsx';

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

      let ToolbarItem = await generateToolbarItems();

      // console.log(toolBarItem)

      let props = {
        measurements: {
          advancedUIToolbar: {
            width: 100,
          },
        },
        components: {
          advancedUIToolbarItem: ToolbarItem,
        },
      }

      this.editor = await PhotoEditorSDKUI.init({
        license: '',
        container: this.container ? this.container.nativeElement : '',
        image: this.src,
        assetBaseUrl: '/assets/photoeditorsdk',
        custom: {
          measurements: {
            advancedUIToolbar: {
              width: 175,
            },
          },
          components: {
            advancedUIToolbarItem: ToolbarItem,
          },
        }
        
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
