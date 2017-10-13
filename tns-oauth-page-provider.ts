/// <reference path="references.d.ts" />

import { Page } from 'ui/page';
import { GridLayout } from 'ui/layouts/grid-layout';
import { StackLayout } from 'ui/layouts/stack-layout';
import { WebView } from 'ui/web-view';
//import { TnsOAuthWebViewDelegateImpl } from './tns-oauth-webview';
import { TnsOAuthWebViewHelper } from './tns-oauth-webview-helper';


export class TnsOAuthPageProvider {
    private _checkCodeIntercept: (WebView, error?, url?) => boolean;
    private _authUrl: string;
    private _webviewSettingsIntercept: (WebView) => void;

    constructor(checkCodeIntercept, authUrl, webviewSettingsIntercept) {
        this._checkCodeIntercept = checkCodeIntercept;
        this._authUrl = authUrl;
        this._webviewSettingsIntercept = webviewSettingsIntercept;
    }

    public loginPageFunc() {
        let wv = new WebView();

        this._webviewSettingsIntercept(wv);
        TnsOAuthWebViewHelper.initWithWebViewAndIntercept(wv, this._checkCodeIntercept);

        let grid = new GridLayout();
        grid.addChild(wv);

        let stack = new StackLayout();
        stack.addChild(grid);

        let page = new Page();
        page.content = stack;

        wv.src = this._authUrl;
        this._webviewSettingsIntercept(wv);

        return page;
    };
}
