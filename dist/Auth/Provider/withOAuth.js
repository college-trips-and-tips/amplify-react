"use strict";
/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var core_1 = require("@aws-amplify/core");
var auth_1 = require("@aws-amplify/auth");
var Amplify_UI_Theme_1 = require("../../Amplify-UI/Amplify-UI-Theme");
var ui_1 = require("@aws-amplify/ui");
var Amplify_UI_Components_React_1 = require("../../Amplify-UI/Amplify-UI-Components-React");
var constants_1 = require("../common/constants");
var logger = new core_1.ConsoleLogger('withOAuth');
function withOAuth(Comp, options) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            _this.signIn = _this.signIn.bind(_this);
            return _this;
        }
        class_1.prototype.signIn = function () {
            if (!auth_1.default || typeof auth_1.default.configure !== 'function') {
                throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
            }
            var _a = auth_1.default.configure().oauth, oauth = _a === void 0 ? {} : _a;
            // to keep backward compatibility
            var cognitoHostedUIConfig = oauth ? (oauth['domain'] ? oauth : oauth.awsCognito) : undefined;
            var config = this.props.oauth_config || options || cognitoHostedUIConfig;
            logger.debug('withOAuth configuration', config);
            var domain = config.domain, redirectSignIn = config.redirectSignIn, redirectSignOut = config.redirectSignOut, responseType = config.responseType;
            var options = config.options || {};
            var url = 'https://' + domain
                + '/login?redirect_uri=' + redirectSignIn
                + '&response_type=' + responseType
                + '&client_id=' + (options.ClientId || auth_1.default.configure().userPoolWebClientId);
            try {
                localStorage.setItem(constants_1.default.SIGN_IN_WITH_HOSTEDUI_KEY, 'true');
            }
            catch (e) {
                logger.debug('Failed to set item into localStorage', e);
            }
            window.location.assign(url);
        };
        class_1.prototype.render = function () {
            return (React.createElement(Comp, __assign({}, this.props, { OAuthSignIn: this.signIn })));
        };
        return class_1;
    }(react_1.Component));
}
exports.default = withOAuth;
var Button = function (props) { return (React.createElement(Amplify_UI_Components_React_1.SignInButton, { id: ui_1.oAuthSignInButton, onClick: props.OAuthSignIn, theme: props.theme || Amplify_UI_Theme_1.default, variant: 'oAuthSignInButton' },
    React.createElement(Amplify_UI_Components_React_1.SignInButtonContent, { theme: props.theme || Amplify_UI_Theme_1.default }, core_1.I18n.get(props.label || 'Sign in with AWS')))); };
exports.OAuthButton = withOAuth(Button);
//# sourceMappingURL=withOAuth.js.map