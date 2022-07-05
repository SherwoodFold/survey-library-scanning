import { ChangeDetectorRef, Component } from "@angular/core";
import { SurveyModel, StylesManager } from "survey-core";
import * as Survey from "survey-core";
StylesManager.applyTheme("default");

@Component({
  selector: "test",
  template: "<div id='surveyElement'><survey *ngIf='!!model' [model]='model'></survey></div><div id='surveyResultElement'></div>",
})
export class TestComponent {
  public model?: SurveyModel;
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    (window as any).Survey = Survey;
    (<any>window).setSurvey = (survey: SurveyModel) => {
      this.model = survey;
      this.changeDetectorRef.detectChanges();
    }
  }
}
