var capacitorUsercentricsCmp = (function (exports, core) {
    'use strict';

    const UsercentricsCmp = core.registerPlugin('UsercentricsCmp', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.UsercentricsCmpWeb()),
    });

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
            console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');
            return Promise.resolve(MOCK_CONSENTS);
        }
        async update() {
            console.log(`update consents`);
            console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');
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

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
