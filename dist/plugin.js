var capacitorUsercentricsCmp = (function (exports, core) {
    'use strict';

    const UsercentricsCmp = core.registerPlugin('UsercentricsCmp', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.UsercentricsCmpWeb()),
    });

    const MOCK_CONSENTS = {
        acceptedVendors: [
            {
                'id': 'MbHgRDHhR',
                'label': 'Firebase (ohne Analysefunktion)',
                'categoryId': 'essential',
                'subVendors': [],
            },
            {
                'id': 'yBaAnQfrt',
                'label': 'Google Firebase',
                'categoryId': 'marketing',
                'subVendors': [],
            },
            {
                'id': 'H1Vl5NidjWX',
                'label': 'Usercentrics Consent Management Platform',
                'categoryId': 'essential',
                'subVendors': [],
            },
        ],
    };
    class UsercentricsCmpWeb extends core.WebPlugin {
        async init(options) {
            console.log(`get consents for ${options.settingsId}`);
            console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');
            return Promise.resolve(MOCK_CONSENTS);
        }
        async update(options) {
            console.log(`update consents for ${options.settingsId}`);
            console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');
            return Promise.resolve(MOCK_CONSENTS);
        }
        async reset(options) {
            console.log(`reset consents for ${options.settingsId}`);
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
