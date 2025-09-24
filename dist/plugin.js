var capacitorUsercentricsCmp = (function (exports, core) {
    'use strict';

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
    class UsercentricsCmpWeb extends core.WebPlugin {
        async init(options) {
            return new Promise((resolve, reject) => {
                loadUsercentricsCmp(options, (error) => {
                    if (error) {
                        reject(error);
                    }
                    window.addEventListener('UC_UI_INITIALIZED', () => {
                        var _a;
                        const vendors = this.getMappedVendors((_a = window.UC_UI) === null || _a === void 0 ? void 0 : _a.getServicesBaseInfo());
                        /*
                         * we shouldn't hide the privacy button for legal reasons
                         *
                          setTimeout(() => {
                            const shadowRoot = document.querySelector('#usercentrics-root')?.shadowRoot;
                            const privacyButton = shadowRoot?.querySelector('[data-testid="uc-privacy-button"]');
            
                            if (privacyButton) {
                              privacyButton.style.display = 'none';
                            }
                          }, 500);
                        */
                        resolve({ vendors });
                    }, { once: true });
                });
            });
        }
        async update(_options) {
            try {
                window.UC_UI.showSecondLayer();
            }
            catch (error) {
                console.error('Failed to show Usercentrics second layer.', error);
            }
            // updated vendors are handled in client consentService.watchWebCmpChanges
            return Promise.resolve(null);
        }
        async reset() {
            var _a;
            if (window.UC_UI) {
                try {
                    await ((_a = window.UC_UI) === null || _a === void 0 ? void 0 : _a.clearStorage());
                }
                catch (error) {
                    console.error(error);
                }
            }
            // updated vendors are handled in client consentService.watchWebCmpChanges
            return Promise.resolve(null);
        }
        getMappedVendors(services) {
            return (services === null || services === void 0 ? void 0 : services.map((service) => {
                return {
                    status: service.consent.status,
                    id: service.id,
                    type: service.categorySlug,
                    version: service.version,
                    label: service.name,
                };
            })) || [];
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
