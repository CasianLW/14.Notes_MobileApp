# MobileApp Ionic Vue (using API)

## Install

1. Download project & unzip
2. `npm install` to install dependencies
3. `ionic serve` to run & test (you need to instal ionic cli if not already done that)
4. Change API_URL into src/stores/auth & notes

## Deploy on Netlify

(if you have troubles with typescript just go to package.json and delete 'vue-tsc && ' from build script)

### WAY 1

1. `ionic build --prod` that will generate you the build files locally
2. Go to netlify, select manual deploy and drag and rop the file generated ('dist' for me, 'www' for some)

### WAY 2

1. Go to netlify, select deploy from existent source, link to your git repo
2. Settings: /MobileApp_Front_IonicVue directory, command: npm run build

## Project Steps

1. `ionic start` to start project (vue/tabs)
2. Configure router & empty .vues for pages
3. Design of App.vue for navigation (&auth logic)
4. Link pinia to project and create the stores/auth.js that will be needed inside menu (App.vue), import it into it to make the logic work
5. Modify stores to match api needs
6. Start by the Home.vue, check if user is logged and show dashbord or buttons to Login/Register page
7. Login.vue & Register.vue (logic & form validations)
8. Menu in App.vue (change options if user connected)
9. Route auth protected (notes, noted/:id and account)
10. Account.vue logic & design (easy job)
11. Notes.vue (store logic & design, add/delete & note list)
12. NotesDetail.vue (CRUD of a note)
13. Overall improvements include adding a spinner, handling error cases, and providing custom validation messages...
