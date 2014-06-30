Js.jQuery.metaList
==================
[![Build Status](https://travis-ci.org/metanitesh/Js.jQuery.metaList.svg?branch=master)](https://travis-ci.org/metanitesh/Js.jQuery.metaList)


MetaList is a javascript application designed for simple content organization. even though it can be used as a product but actual purpose of the application is to demonstrate how to craft production ready javascript application. 

demo 

Object oriented design and MVC ( without any framework ).

MetaList demonstrates how to use MVC pattern to craft your code (without using MV* framework) and abstract it into a reusable library. it also leverages  cleaner and simpler prototypal approach to support multilevel inheritance. 

requireJs/ AMD 

metaList implements requireJs to handle dependency injection and async module definition. it also shows how to use requireJs with Jasmine, funcUnit and grunt. 

unit tests/ jasmine

metaList follows TDD approach and uses jasmine to write unit tests. 
run unit test suite in browser.

javascript testing is somewhat deferent than serverside testing and writing unit test cases related to controller brings not only trivial value but more hassle instead metaList uses funcUnit to test controller.


functional tests/ funcunit

metaList uses funcUnit to write functional test case. which allows one to write functional test cases in jasmine with jquery like syntax and run it on iframe.  

run functional test suite in browser.
  
build/ grunt 

metaList utilize grunt as a build tool which runs unit tests cases and lint Js files. 

CI/ travis

CI system can run application's buildFile on multiple environment with every commit and notify  back by email if something goes wrong. although setting up local CI like jenkins could be a potential  hassle travis makes it a breeze for open source github project like metsList.


CSS-SMACSS

metaList follows smacss guidelines to architect css in modular fashion and organizes base, layout and module classes separately. every css module in metalist can be effectively re-used and adopt different layouts.

CSS-RWD
metalist responds with user friendly version of application on smaller resolution

DB/ localStorage 
metaList stores data locally in your browser.

jQuery/underscore
metalist uses jquery for Dom and underscore for utility belt.


