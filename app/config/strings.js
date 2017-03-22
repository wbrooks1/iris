//URLs to handle login
export const loginURLs = {
    google : {
        login: 'http://ethan-rowell.ddns.net:8083/auth/google?location=',
        success: 'http://ethan-rowell.ddns.net:8083/auth/google/success',
        failure: 'http://ethan-rowell.ddns.net:8083/auth/google/failure',
    },
    facebook : {
        login: 'http://ethan-rowell.ddns.net:8083/auth/facebook?location=',
        success: 'http://ethan-rowell.ddns.net:8083/auth/facebook/success',
        failure: 'http://ethan-rowell.ddns.net:8083/auth/facebook/failure',
    },
    twitter : {
        login: 'http://ethan-rowell.ddns.net:8083/auth/twitter?location=',
        success: 'http://ethan-rowell.ddns.net:8083/auth/twitter/success',
        failure: 'http://ethan-rowell.ddns.net:8083/auth/twitter/failure',
    }
};

//URLs to handle incident activities
export const incidentURLs = {
    incidents: 'http://ethan-rowell.ddns.net:8083/api/incidents',
    reports: 'http://ethan-rowell.ddns.net:8083/api/',
    users: 'http://ethan-rowell.ddns.net:8083/api/users/',
    search: 'http://ethan-rowell.ddns.net:8083/api/incidents?keywords=',
};