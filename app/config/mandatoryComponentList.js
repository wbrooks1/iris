export const components = {
    medical: [
        {"id": "title", "type": "text", "title": "Title", "placeholder": "Enter incident title"},
        {"id": "description", "type": "multi_text", "title": "Description", "placeholder": "Enter incident description"},
        {"id": "start_date", "type": "date", "title": "Start Date", "placeholder": "1/1/1"},
        {"id": "end_date", "type": "date", "title": "End Date", "placeholder": "1.1.1"},
        {"id": "keywords", "type": "text", "title": "Search Keywords", "placeholder": "Enter search keywords"},

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
