export const loginURLs = {
    google : {
        login: 'http://ethan-rowell.ddns.net:8083/auth/google?location=123,123',
        success: 'http://ethan-rowell.ddns.net:8083/auth/google/success',
        failure: 'http://ethan-rowell.ddns.net:8083/auth/google/failure',
    },
    facebook : {
        login: 'http://ethan-rowell.ddns.net:8083/auth/facebook?lat=123&long=123',
        success: 'http://ethan-rowell.ddns.net:8083/auth/facebook/success',
        failure: 'http://ethan-rowell.ddns.net:8083/auth/facebook/failure',
    },
    twitter : {
        login: 'http://ethan-rowell.ddns.net:8083/auth/twitter?lat=123&long=123',
        success: 'http://ethan-rowell.ddns.net:8083/auth/twitter/success',
        failure: 'http://ethan-rowell.ddns.net:8083/auth/twitter/failure',
    }
};

export const incidentURLs = {
    incidents: 'http://ethan-rowell.ddns.net:8083/api/incidents',
    reports: 'http://ethan-rowell.ddns.net:8083/api/',
    users: 'http://ethan-rowell.ddns.net:8083/api/users/'
};