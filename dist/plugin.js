var capacitorPlugin = (function (exports, core) {
    'use strict';

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const MOCK_CONSENTS = {
        acceptedVendors: [
            {
                'id': 'Afk_Nife_',
                'label': 'Adjust',
                'categoryId': 'marketing',
                'subVendors': [],
            },
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
                'id': '5bG1RVWaN',
                'label': 'The Adex',
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
        constructor() {
            super({
                name: 'UsercentricsCmp',
                platforms: ['web'],
            });
        }
        getConsents(options) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(`get consents for ${options.settingsId}`);
                console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');
                return Promise.resolve(MOCK_CONSENTS);
            });
        }
        updateConsents(options) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(`update consents for ${options.settingsId}`);
                console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');
                return Promise.resolve(MOCK_CONSENTS);
            });
        }
        resetConsents(options) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(`reset consents for ${options.settingsId}`);
                console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');
                return Promise.resolve(MOCK_CONSENTS);
            });
        }
    }
    const UsercentricsCmpInstance = new UsercentricsCmpWeb();
    core.registerWebPlugin(UsercentricsCmpInstance);

    exports.UsercentricsCmpInstance = UsercentricsCmpInstance;
    exports.UsercentricsCmpWeb = UsercentricsCmpWeb;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, capacitorExports));
//# sourceMappingURL=plugin.js.map
