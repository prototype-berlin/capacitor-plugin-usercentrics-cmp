import { WebPlugin } from '@capacitor/core';
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
export class UsercentricsCmpWeb extends WebPlugin {
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
//# sourceMappingURL=web.js.map