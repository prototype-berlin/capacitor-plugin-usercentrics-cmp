import { WebPlugin } from '@capacitor/core';

function loadUsercentricsCmp(options, callback) {

  let script = document.createElement('script');
  script.src = 'https://app.usercentrics.eu/browser-ui/latest/loader.js';
  script.id = 'usercentrics-cmp';
  script.dataset.settingsId = options.settingsId;
  script.async = true;
  script.onload = () => callback();
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

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
export class UsercentricsCmpWeb extends WebPlugin {
    async init(options) {
      console.log(`get consents for ${options.settingsId}`);

      /*
      return new Promise((resolve, reject) => {
        loadUsercentricsCmp(options, (error) => {
          if (error) {
            reject(error);
          }

          if (window.UC_UI) {
            return resolve(MOCK_CONSENTS);
          }

          window.addEventListener('UC_UI_INITIALIZED', function (event) {
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
      
       */


      return Promise.resolve(MOCK_CONSENTS);
    }

    async update() {
        console.log(`update consents1`);
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
//# sourceMappingURL=web.js.map
