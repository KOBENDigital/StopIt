import { html, customElement, property, state, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement, UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { StopIt } from "../types/StopIt";
import { UmbChangeEvent } from "@umbraco-cms/backoffice/event";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";


@customElement('uduf-stopit')
export default class UdufStopItPropertyEditorUIElement extends UmbLitElement implements UmbPropertyEditorUiElement {
  

    @property({ type: Object })
    public value: StopIt;

  

    @state()
    private _currentStatusText: string = 'Unlocked';

    @state()
    private _isProtected: boolean = false;

    constructor() {
        super();

        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (_instance) => {
            console.log("loaded:" + this.value?.pr + "|");


            if (!this.value) {
                 this.value  = new StopIt()
               
            }

            this._isProtected = this.value.protected;
            this._currentStatusText = this._isProtected ? 'Locked' : 'Unlocked';
        });


    }



    #toggleLock() {

        this._isProtected = !this._isProtected;
        this._currentStatusText = this._isProtected ? 'Locked' : 'Unlocked';

       this.value = { ...this.value, ...{ protected: this._isProtected } };
      
        this.#dispatchChangeEvent();

    }

    #dispatchChangeEvent() {
        console.log(this.value);
       // this.dispatchEvent(new UmbChangeEvent());
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }


    render() {

        
        return html`
     ${this.value.protected }

        <uui-toggle
              slot="header-actions"
              value=${this._isProtected}
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