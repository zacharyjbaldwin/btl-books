// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  stringFor: {
    true: 'FDBC5F518E44154B29B54B77E7ACE79DAB5D55873552BF23B9B2F2EE0587B229',
    false: 'C4356E4846A6CCC89006B1216C4D0A9F3ED59B3395E825C3003F0576C5FA3A61',
    token: 'token',
    expiration: 'expiration',
    userId: 'userId',
    firstname: 'firstname',
    lastname: 'lastname',
    isAdmin: 'isAdmin',
    email: 'email'
  },
  webAppUrl: 'http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
