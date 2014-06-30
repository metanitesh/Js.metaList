###Js.metaList [![BuildStatus](https://travis-ci.org/metanitesh/Js.jQuery.metaList.svg?branch=master)](https://travis-ci.org/metanitesh/Js.jQuery.metaList)

>MetaList is a javascript application designed for simple content organization. even though it can be used as a product but actual purpose of the application is to demonstrate how to craft production ready javascript application. 
- [project demo](https://www.niteshsharma.com/jsMetaList)
- [unit tests](https://www.niteshsharma.com/jsMetaList/functional/specrunner.html)
- [functional tests](https://www.niteshsharma.com/jsMetaList/unit/specrunner.html)


####Object oriented design and MVC ( without any framework ).

MetaList demonstrates how to use MVC pattern to craft your code (without using MV* framework) and abstract it into a reusable library. it also leverages  cleaner and simpler prototypal approach to support multilevel inheritance. 

####RequireJs/ AMD 

MetaList implements requireJs to handle dependency injection and async module definition. It also shows how to use requireJs with Jasmine, funcUnit and grunt. 

####Unit tests/ Jasmine

MetaList follows TDD approach and uses jasmine to write unit tests. 

Javascript testing is somewhat deferent than server-side testing and writing unit test cases related to controller brings not only trivial value but more hassle instead metaList uses funcUnit to test controller.

- [run unit tests](https://www.niteshsharma.com/jsMetaList/functional/specrunner.html)

####Functional tests/ Funcunit

MetaList uses funcUnit to write functional test case. FuncUnit allows you to write functional test cases in jasmine with jquery like syntax and run it on iframe.  

- [run functional tests](https://www.niteshsharma.com/jsMetaList/functional/specrunner.html)
  
####Build/ Grunt 

MetaList utilize grunt as a build tool and uses it to runs unit tests and lint Js files. 

####CI/ Travis

CI system can run application's buildFile on multiple environment with every commit and notify back by email if something goes wrong. Although setting up local CI like jenkins could be a potential  hassle travis makes it a breeze for open source github project like metsList.


####SMACSS

MetaList follows smacss guidelines to architect css in modular fashion and organizes base, layout and module classes separately. Every css module in metalist can be effectively re-used and adopt different layouts.

####CSS-RWD
Metalist responds with user friendly version of application on smaller resolution.

####DB/ LocalStorage 
MetaList stores data locally in your browser.

####jQuery/ Uunderscore
Metalist uses jquery for Dom and Underscore for utility belt.


