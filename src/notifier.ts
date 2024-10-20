import { Base } from "./base";
import { settings } from "./settings";
import { property } from "./jsonobject";
import { CssClassBuilder } from "./utils/cssClassBuilder";
import { ActionContainer } from "./actions/container";
import { IAction } from "./actions/action";

export class Notifier extends Base {
  @property({ defaultValue: false }) active: boolean;
  @property() message: string;
  @property() css: string;
  timeout = settings.notifications.lifetime;
  timer: any = undefined;
  private actionsVisibility: { [key: string]: string } = {};
  public actionBar: ActionContainer;

  constructor(private cssClasses: { root: string, info: string, error: string, success: string, button: string }) {
    super();
    this.actionBar = new ActionContainer();
    this.actionBar.updateCallback = (isResetInitialized: boolean) => {
      this.actionBar.actions.forEach(action => action.cssClasses = {});
    };
  }

  getCssClass(type: string): string {
    return new CssClassBuilder()
      .append(this.cssClasses.root)
      .append(this.cssClasses.info, type !== "error" && type !== "success")
      .append(this.cssClasses.error, type === "error")
      .append(this.cssClasses.success, type === "success")
      .toString();
  }

  updateActionsVisibility(type: string): void {
    this.actionBar.actions.forEach(action => action.visible = (this.actionsVisibility[action.id] === type));
  }

  notify(message: string, type: string = "info"): void {
    this.updateActionsVisibility(type);
    this.message = message;
    this.active = true;
    this.css = this.getCssClass(type);

    if(!!this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    this.timer = setTimeout(() => {
      this.timer = undefined;
      this.active = false;
    }, this.timeout);
  }

  public addAction(action: IAction, notificationType: string): void {
    action.visible = false;
    action.innerCss = this.cssClasses.button;
    const res = this.actionBar.addAction(action);
    this.actionsVisibility[res.id] = notificationType;
  }
}
