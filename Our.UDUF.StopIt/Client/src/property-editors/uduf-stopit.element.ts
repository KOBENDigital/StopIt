import { html, customElement, property, state, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/property-editor";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('uduf-protect')
export default class UdufProtectPropertyEditorUIElement extends UmbLitElement implements UmbPropertyEditorUiElement {
  

    @property({ type: Object })
    public value: boolean | undefined;

    @state()
    private _currentStatusText: string = 'Unlocked';

    @state()
    private _idProtected: boolean = false;

    constructor() {
        super();
    }



    #toggleLocl() {

        this._idProtected = !this._idProtected;
        this._currentStatusText = this._idProtected ? 'Locked' : 'Unlocked';
       
    }



    render() {
        return html`
       
        <uui-toggle
              slot="header-actions"
              value=${this._idProtected}
              label="${this._currentStatusText}"
              @change=${this.#toggleLocl}
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
        'uduf-protect': UdufProtectPropertyEditorUIElement;
    }
}