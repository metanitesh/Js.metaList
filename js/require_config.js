requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'js/lib/jquery-1.11.1',
        underscore: 'js/lib/underscore',

        Model: 'js/app/Model',
        Controller: 'js/app/Controller',
        
        ListModel: 'js/app/listmodel',
        TaskModel: 'js/app/taskmodel',
        
        ListController: 'js/app/listcontroller'
    }
});

requirejs(['js/app']);
