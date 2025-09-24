import { WebPlugin } from '@capacitor/core';
import { UsercentricsBaseService, UsercentricsVendor } from './definitions';

function loadUsercentricsCmp(options: { settingsId: string, language: string }, callback: any) {
  let script = document.createElement('script');
  script.src = 'https://app.usercentrics.eu/browser-ui/latest/loader.js';
  script.id = 'usercentrics-cmp';
  script.dataset.settingsId = options.settingsId;
  script.async = true;
  script.onload = () => callback();
  script.onerror = () => callback(new Error(`Script load error for ${options.settingsId}`));

  document.body.append(script);
}

export class UsercentricsCmpWeb extends WebPlugin {
    public async init(options: { settingsId: string, language: string }) {
      return new Promise((resolve, reject) => {
        loadUsercentricsCmp(options, (error: any) => {
          if (error) {
            reject(error);
          }

          window.addEventListener('UC_UI_INITIALIZED', () => {
            const vendors = this.getMappedVendors(window.UC_UI?.getServicesBaseInfo());

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

    async update(_options: { language: string }) {
        try {
          window.UC_UI.showSecondLayer();
        } catch (error) {
          console.error('Failed to show Usercentrics second layer.', error);
        }

        // updated vendors are handled in client consentService.watchWebCmpChanges
        return Promise.resolve(null);
    }
    async reset() {
      if (window.UC_UI) {
        try {
          await window.UC_UI?.clearStorage();
        } catch (error) {
          console.error(error);
        }
      }

      // updated vendors are handled in client consentService.watchWebCmpChanges
      return Promise.resolve(null);
    }

    private getMappedVendors(services: UsercentricsBaseService[]): UsercentricsVendor[] {
    return services?.map((service) => {
      return {
        status: service.consent.status,
        id: service.id,
        type: service.categorySlug,
        version: service.version,
        label: service.name,
      };
    }) || [];
  }

}
//# sourceMappingURL=web.js.map
