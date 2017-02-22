# fthelp-wp-template
Generate the wordpres template styling for the help section of fthelp.ft.com website being hosted by wpengine.com. 
This repository only generate a wordpress template and it should never be commited to the repository but generated from the build script.

## prerequisites

Use nodejs & npm
https://nodejs.org/en/

Use Origami Build Tools 
https://github.com/Financial-Times/origami-build-tools

Use Gulp 
http://gulpjs.com/

## Install
Run the following:

```
npm install
```

## Build

The build script need to be run with parameters that will define the name given to the wordpress theme and the location where it would be generated.

1. **--theme:** **_compulsory_** This is the name given to the wp theme and can be any string preferably continous and without using special character (if you do it's untestet)
1. **--env:** [dev, prod] (default=dev) This define if the theme environment. If **dev** is selected js/css are only aggregated and if **prod** is selected the js/css are aggregated and obfuscated
1. **--themeFolder:** (default=wpcontent/themes/) The location where you want the wp themes to be generated. 
However a default is define I will not recommend you to left it empty: as the gitignore exclude wpcontent folder it will make it impossible for you to push the generated content to the remote wpengine server. 
I will recommend you to check out the wpengine repos and set the themeFolder to that location as you can see below the build script is referencing to a themFolder location outside of the current folder location. Doing this make it much simplier to deploy the theme and keep commit history comprehensible. 
1. **--version:** The version will automatically be picked up from the package.json it is highly recommended that you keep that version in sync with the wordpress theme currently deployed and in use. Using that parameters will avoid you from overwritting the production theme

Minimal build usage

```
gulp build --theme fthelp
```

Recommended build usage for dev

```
gulp build --theme fthelp --env dev --themeFolder ../fthelp-staging/wp-content/themes/ --version 1.0.0
```

Recommended production build usage

```
gulp build --theme fthelp --env prod --themeFolder ../fthelp-staging/wp-content/themes/ --version 1.0.0
```

A watch gulp task is available and should run using the same parameters 
```
gulp watch --theme fthelp --env dev --themeFolder ../fthelp-staging/wp-content/themes/ --version 1.0.0
```

**_NOTE IMPORTANT_** backup /src/templates/footer.php and /src/templates/header.php before running those task
In the gulp script there are 3 more tasks that you should be aware off **build-footer**, Experimental(**build-header**, **build-ft-navigation**) 

To build the footer I wrote that task who fetch the content from the ft.com website extract the footer and inject it in the footer.php 
Please bear in mind that logic worked at one point in time but might not work when you run it. 

```
gulp build-footer
```

_In theory you should not need this but still in case you do_ 
At one point UX/Design expressed the desire to use a similar header navigation as the ft.com this task will extract the navigation from ft.com and regenerate the header.php template with an exact copy of the ft.com navigation allowing you to edit manually the source before building the theme 
```
gulp build-header
```

Importing the ft.com header navigation require a lot of manual editing and build-ft-navigation do try to reduce the amount of work required to generate this. 
This was experimental and a work in progress.
```
gulp build-ft-navigation --theme fthelp --env dev --themeFolder ../fthelp-staging/wp-content/themes/ --version 1.0.0
```

## Deploy

You'll need to familiarise yourself with the wpengine process following the instruction below to gain access to the wpengine repo.

https://wpengine.com/git/

The wpengine repo is (you should never used the production repos to push changes but always push to staging switch to the new theme. Follow the relevant regression test to make sure nothing is broken than log in to production and deploy from staging to production)
```
git@git.wpengine.com:staging/fthelp.git
```


