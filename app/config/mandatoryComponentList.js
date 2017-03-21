var date = new Date();
date.setFullYear(date.getFullYear() + 3);
export const components = {
    medical: [
        {"id": "title", "type": "text", "title": "Title", "placeholder": "Enter incident title"},
        {"id": "desc", "type": "multi_text", "title": "Description", "placeholder": "Enter incident description"},
        {"id": "start_date", "type": "date", "title": "Start Date", "data": new Date().toDateString()},
        {"id": "end_date", "type": "date", "title": "End Date", "data": date.toDateString()},
        {"id": "keywords", "type": "text", "title": "Search Keywords", "placeholder": "Enter search keywords"},
        {"id": "location", "type": "location", "data": "", "title": "Incident Location"},
        {"id": "freq", "type": "drop", "title": "Reporting Frequency", "data": "P1H"},


    ],
    natural : {
        "title" : {"type": "text", "title": "Title", "placeholder": "Enter incident title"},
        "description" : {"type": "multi_text", "title": "Description", "placeholder": "Enter incident description"},
    },
    military : {
        "title" : {"type": "text", "title": "Title", "placeholder": "Enter incident title"},
        "description" : {"type": "multi_text", "title": "Description", "placeholder": "Enter incident description"},
    }
};

