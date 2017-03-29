//URLs to handle login
export const loginURLs = {
    google : {
        login: 'http://iris-app.westus.cloudapp.azure.com/auth/google?location=',
        success: 'http://iris-app.westus.cloudapp.azure.com/auth/google/success',
        failure: 'http://iris-app.westus.cloudapp.azure.com/auth/google/failure',
    },
    facebook : {
        login: 'http://iris-app.westus.cloudapp.azure.com/auth/facebook?location=',
        success: 'http://iris-app.westus.cloudapp.azure.com/auth/facebook/success',
        failure: 'http://iris-app.westus.cloudapp.azure.com/auth/facebook/failure',
    },
    twitter : {
        login: 'http://iris-app.westus.cloudapp.azure.com/auth/twitter?location=',
        success: 'http://iris-app.westus.cloudapp.azure.com/auth/twitter/success',
        failure: 'http://iris-app.westus.cloudapp.azure.com/auth/twitter/failure',
    }
};

//URLs to handle incident activities
export const incidentURLs = {
    incidents: 'http://iris-app.westus.cloudapp.azure.com/api/incidents',
    reports: 'http://iris-app.westus.cloudapp.azure.com/api/',
    users: 'http://iris-app.westus.cloudapp.azure.com/api/users/',
    search: 'http://iris-app.westus.cloudapp.azure.com/api/incidents?keywords=',
    update: 'http://iris-app.westus.cloudapp.azure.com/api/incidents/',
    categories: 'http://iris-app.westus.cloudapp.azure.com/api/categories',
};