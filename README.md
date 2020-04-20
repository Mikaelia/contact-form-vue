# zenform

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## Technical Decisions

### Styling

One of the nice features working with Vue is the ability to combine a component's HTML, CSS, and Javascript in a single file. Vue also offers builtin local CSS scoping, and comes with support of preprocessors. I took advantage of locally scoped styles for this project, but also dedicated a file to global styles that could be shared throughout the application. These styles consist of basic resets, application-wide font styles, sizes, and etc. and live in `App.vue`. It's also useful to have a file dedicated to CSS variables that can be reused, and changed quickly if needed. I decided to extract certain text, color, and border-radius values variables into `variables.css` for this reason.

### Validation

Instead of writing my own validators for each input field, I integrated Vuelidate. I chose Vuelidate with the rationale that the prebuilt validators are well tested,less error prone, and coupld be implemented much more quickly. In addition, Vuelidate's quite extensible: custom validators can be easily added to complement Vuelidate's premade offerings.

### Data Storage

For storing user data, I used Firebase. I've used Firebase in the past for simple projects, and it's a great tool to get up and running quickly with data storage without having to spin up your own backend. It also made more sense to me than creating a Vuex store, as forms in the wild normally post to databases, and I wanted to mimic that functionality. Firebase allos me to easily push new data to my cloud storage, and retrieve it elsewhere in my application. I saw this as a good solution to developing the page with specific user information.

### File Organization / Component Design

I chose to break down my the form into generic, "base" components in order to increase their reusability and give myself flexibility in regards to having tools to compose any future forms I might need to in the future. These components--BaseInput, BaseLabel, BaseForm, and BaseButton-- live in their own 'base-components' folder. The components that are composed of these base components live one directory above, while pages are within the `views` directory.
