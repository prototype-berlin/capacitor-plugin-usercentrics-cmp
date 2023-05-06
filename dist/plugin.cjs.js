'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const UsercentricsCmp = core.registerPlugin('UsercentricsCmp', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.UsercentricsCmpWeb()),
});

function loadUsercentricsCmp(options, callback) {
    let script = document.createElement('script');
    script.src = 'https://app.usercentrics.eu/browser-ui/latest/loader.js';
    script.id = 'usercentrics-cmp';
    script.dataset.settingsId = options.settingsId;
    script.async = true;
    script.onload = () => callback();
    script.onerror = () => callback(new Error(`Script load error for ${options.settingsId}`));
    document.body.append(script);
}
const MOCK_CONSENTS = {
    vendors: [
        {
            'status': true,
            'type': null,
            'version': '1.0',
            'id': 'uNl9XGnZC',
            'label': 'Google Firebase',
        },
        {
            'status': false,
            'type': 'test',
            'version': '1.0',
            'id': 'S1pcEj_jZX',
            'label': 'Google Maps',
        },
        {
            'status': true,
            'type': 'explicit',
            'version': '1.0',
            'id': 'H1Vl5NidjWX',
            'label': 'Usercentrics Consent Management Platform',
        },
    ],
};
class UsercentricsCmpWeb extends core.WebPlugin {
    async init(options) {
        console.log(`get consents for ${options.settingsId}`);
        return new Promise((resolve, reject) => {
            loadUsercentricsCmp(options, (error) => {
                if (error) {
                    reject(error);
                }
                // @ts-ignore
                if (window.UC_UI) {
                    return resolve(MOCK_CONSENTS);
                }
                window.addEventListener('UC_UI_INITIALIZED', function () {
                    // @ts-ignore
                    var uc = window.UC_UI;
                    console.log(uc);
                    console.log(uc.isInitialized());
                    console.log(uc.getServicesBaseInfo());
                    console.log(uc.areAllConsentsAccepted());
                    uc.clearStorage();
                    resolve(MOCK_CONSENTS);
                });
                window.addEventListener('UC_UI_CMP_EVENT', function (event) {
                    console.log(event);
                });
            });
        });
    }
    async update(options) {
        console.log(`update consents1`, options);
        console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');
        //if (window.UC_UI && window.UC_UI.isInitialized()) {
        //  UC_UI.showSecondLayer()
        //}
        return Promise.resolve(MOCK_CONSENTS);
    }
    async reset() {
        console.log(`reset consents`);
        console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');
        return Promise.resolve(MOCK_CONSENTS);
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UsercentricsCmpWeb: UsercentricsCmpWeb
});

exports.UsercentricsCmp = UsercentricsCmp;
//# sourceMappingURL=plugin.cjs.js.map
