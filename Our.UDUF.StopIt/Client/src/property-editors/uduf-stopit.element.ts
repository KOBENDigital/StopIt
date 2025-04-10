import { html, customElement, property, state, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement, UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { StopIt } from "../types/StopIt";


@customElement('uduf-stopit')
export default class UdufStopItPropertyEditorUIElement extends UmbLitElement implements UmbPropertyEditorUiElement {
  

    @property({ type: Object })
    public value: StopIt = new StopIt();

  

    @state()
    private _currentStatusText: string = 'Unlocked';


    constructor() {
        super();

      
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