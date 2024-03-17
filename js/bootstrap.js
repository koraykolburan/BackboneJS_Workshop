/* 
[FIRST] --------------------------------------------------------------------------------------------------------
Let's to create the ONLY GLOBAL VARIABLE that we will use in the application.
It's a best practice when you code in javaScript to avoid as much as possible to use GLOBAL VARIABLES.
And that's because you could use a third party LIBRARY that redefined the same variable that you are using.
So if you contain your global variables to zero or too close zero you have less issues of this type.
So we will use only ONE SINGLE GLOBAL VARIABLE that we're going to call 'app' like application.
It's unlikely that will have to use a library that defines a variable with a same name.
We put all of our informations inside of this variable. 
In order to keep everything contain one single property in memory.
----------------------------------------------------------------------------------------------------------------
1) In this variable will a various object one containing the constructors for the ROUTERS.
2) Another property containing the constructors for the VIEWS.
3) Another property containing the constructors for the MODELS and COLLECTIONS.
4) And then a property that will contain the objects that we are going to create using the different constructors DATA. 
5) So everything will be accessible using this global app variable.
   'app.data' will allow us to reach all of the object that we created in the application.
   'app.routers', 'app.views' and 'app.models' will allow us to use all of the different type of constructor functions. 
   Extending the functionality is that BackboneJS provide.
*/
let app = {
    routers: {},
    views: {},
    models: {},

    data: {}
};