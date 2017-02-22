export const incident = {
    incident: [
        {user: 'username'},
        {category: 'medical'},
        {time_stamp: 'Mon Feb 20 2017'},
        {id:'title', data: 'Incident 1 ', type: 'text', title: 'Title'},
        {id: 'start_date', data: 'Mon Feb 20 2017', type: 'date', title: 'Start Date'},
        {id: 'end_date', data: 'Thu Feb 20 2020', type: 'date', title: 'End Date'},
        {id: 'location', data: '47.6538565, -122.3541857', type: 'location', title: 'Location'},
        {id: 'description',
            data: 'This is a test description, generally a real description would go here.',
            type: 'multi_text', title: 'Description'
        },
        {id: 'keywords', data: 'incident, iris, app', type: 'text', title: 'Keywords'},
        {id: 'Dynamic Date:', data: 'Thu Feb 23 2017', type: 'date', title: 'Dynamic Date'},
    ]
};
