var date = new Date();
date.setFullYear(date.getFullYear() + 3);
export const components = {
    medical: [
        {"id": "title", "type": "text", "title": "Title", "placeholder": "Enter incident title"},
        {"id": "description", "type": "multi_text", "title": "Description", "placeholder": "Enter incident description"},
        {"id": "start_date", "type": "date", "title": "Start Date", "date": new Date().toDateString()},
        {"id": "end_date", "type": "date", "title": "End Date", "date": date.toDateString()},
        {"id": "keywords", "type": "text", "title": "Search Keywords", "placeholder": "Enter search keywords"},
        {"id": "location", "type": "location", "title": "Incident Location"}

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

