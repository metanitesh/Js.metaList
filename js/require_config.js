requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'js/lib/jquery-1.11.1',
        underscore: 'js/lib/underscore',

        Model: 'js/app/Model',
        ListModel: 'js/app/listModel',
        TaskModel: 'js/app/taskmodel'
    }
});

requirejs(['js/app']);
