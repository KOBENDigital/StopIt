import { html, customElement, property, state, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement, UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { StopIt } from "../types/StopIt";
import { type UmbCurrentUserModel, UMB_CURRENT_USER_CONTEXT } from "@umbraco-cms/backoffice/current-user";



@customElement('uduf-stopit')
export default class UdufStopItPropertyEditorUIElement extends UmbLitElement implements UmbPropertyEditorUiElement {
  @state()
    private _currentUser?: UmbCurrentUserModel;

    @property({ type: Object })
    public value: StopIt = new StopIt();

  

    @state()
    private _currentStatusText: string = 'Unlocked';


    constructor() {
        super();

        this.consumeContext(UMB_CURRENT_USER_CONTEXT, (instance) => {
            this._observeCurrentUser(instance);
        });
    }

    //Get the current user
    private async _observeCurrentUser(instance: typeof UMB_CURRENT_USER_CONTEXT.TYPE) {
        this.observe(instance.currentUser, (currentUser) => {
            this._currentUser = currentUser;
            currentUser.permissions;

            console.log(this._currentUser);
        });
    }


    connectedCallback() {
        super.connectedCallback();

        if (!this.value) {
            this.value = new StopIt()

        }

        this.updateProtectedStatusText();
    }


    #toggleLock() {

        this.value = { ...this.value, ...{ protected: !this.value.protected } };

        this.updateProtectedStatusText();
      
        this.#dispatchChangeEvent();

    }

    updateProtectedStatusText() {
        this._currentStatusText = this.value.protected ? 'Locked' : 'Unlocked';
    }

    #dispatchChangeEvent() {
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }


    render() {

        
        return html`

        <uui-toggle
              slot="header-actions"
              ?checked="${this.value.protected}"
              label="${this._currentStatusText}"
              @change=${this.#toggleLock}
            ></uui-toggle>

            
          `;
    }

  

    static styles = [
        css`
          .danger {
            color: var(--uui-color-danger-standalone);
          }
          .warning {
            color: var(--uui-color-warning-standalone);
          }
        `,
    ];

}

declare global {
    interface HTMLElementTagNameMap {
        'uduf-stopit': UdufStopItPropertyEditorUIElement;
    }
}