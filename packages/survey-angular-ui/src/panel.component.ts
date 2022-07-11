import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { PageModel, PanelModel } from "survey-core";
import { BaseAngular } from "./base-angular";
import { AngularComponentFactory } from "./component-factory";
@Component({
  selector: "sv-ng-panel, '[sv-ng-panel]'",
  templateUrl: "./panel.component.html",
})
export class PanelComponent extends BaseAngular<PanelModel> implements AfterViewInit {
  @Input() model!: PanelModel;
  @ViewChild("panelContainer", { static: false, read: ElementRef }) panelContainerRef!: ElementRef<HTMLDivElement>;
  protected getModel(): PanelModel {
    return this.model;
  }
  ngAfterViewInit(): void {
    this.model.survey?.afterRenderPanel(this.model, this.panelContainerRef.nativeElement);
  }
  trackRowBy = (_: any, row: any) => {
    return row.id;
  }
}
AngularComponentFactory.Instance.registerComponent("panel", PanelComponent);